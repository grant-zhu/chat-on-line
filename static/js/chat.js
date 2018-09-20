//if send message
var sendMessageFlag = false
//get username
function getUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
	    let username = this.responseText;
	    //get chat message
	    getMessage(username)
	}
    };
    
    //set sync
    xhttp.open("GET","/getUsername",true);
    xhttp.send();

}

//get chat message
function getMessage(username){
    //ajax send request to get messages
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200) {
	    //parse to JSON 
	    message = JSON.parse(this.responseText);
	    
	    // x[i].style.cssText = "width:100px;height:100px!important;"
	    //traverse message directory
	    var ulTag=document.getElementById('messageList');
	    var messageBox = document.getElementById("message");
	    scrollBottomFlag = false;
	    //if scrollTop in the bottom or user send message
	    if( messageBox.scrollTop ===  messageBox.scrollHeight-messageBox.clientHeight || sendMessageFlag){
		scrollBottomFlag = true;
		//send message to false
		sendMessageFlag = false
	    }

	    for (let i = 0; i < message.length; i++){
		var linode = document.createElement('li');
		var divMesNode = document.createElement('div');
		var chatMessage = message[i].message;
		//add img element for headportrait
		var imageElement = document.createElement('img');
		imageElement.src = message[i].headportrait;
		linode.appendChild(imageElement);
		//add message element
		var textnode = document.createTextNode(chatMessage);
		divMesNode.appendChild(textnode);
		// linode.appendChild(divMesNode)
		//set height for headportrait
		imageElement.style.height = '40px';
		divMesNode.style.textAlign='left';
		divMesNode.style.padding='10px';
		divMesNode.style.borderRadius='5px';
		divMesNode.style.wordBreak = 'break-all';
		//if current user's message
		//alert(message[i].username)
		if(message[i].username == username){
		    //do not show username
		    linode.appendChild(divMesNode);
		    // linode.style.marginRight='60px';
		    // linode.style.textAlign='left';
		    // linode.style.backgroundColor='#b8db29';
		    // linode.style.float='right';
		    // linode.style.marginLeft='300px';
		    imageElement.style.marginRight = '10px';
		    divMesNode.style.marginRight = '10px';
		    divMesNode.style.float='left'; 
		    divMesNode.style.backgroundColor='#b8db29';
		    linode.style.float='right';
		    linode.style.marginLeft='300px';
		}
		else{
		    let messageUsername = message[i].username;
		    var usernode = document.createTextNode(messageUsername);
 		    var divUserNode = document.createElement('div');
		    divUserNode.appendChild(usernode);
		    //linode.appendChild(divUserNode);
		    var divUserMesNode = document.createElement('div');
		    divUserMesNode.appendChild(divUserNode)
		    divUserMesNode.appendChild(divMesNode)
		    linode.appendChild(divUserMesNode);
		    // linode.style.marginLeft='60px';
		    // linode.style.textAlign='left';
		    // linode.style.backgroundColor='#EEE';
		    // linode.style.float='left';
		    // linode.style.marginRight='300px';
		    divUserMesNode.style.float = 'right';
		    divUserNode.style.marginLeft = '20px';
   		    imageElement.style.marginLeft = '10px';
		    imageElement.style.marginTop = '20px';		    
		    divMesNode.style.marginLeft = '10px';
		    divMesNode.style.float='right';
		    divMesNode.style.backgroundColor='#EEE';
		    linode.style.float='left';
		    linode.style.marginRight='300px';
		}
		ulTag.appendChild(linode)
		//if scroll in bottom before, put scroll into bottom
		if(scrollBottomFlag){
		    messageBox.scrollTop = messageBox.scrollHeight;
		}
	    }
    }
  };
  //set sync
  xhttp.open("GET", "/getMessage", true);
  xhttp.send();
}

//send message
function sendMessage(){
    //sendMessage is true
    sendMessageFlag = true
    message = document.getElementById("inputMessage").value
    if(message == ''){
	alert('message can not be empty, need input something')
    }
    else{
	//empty input message
	document.getElementById("inputMessage").value=''
	//send message
	var xhttp = new XMLHttpRequest();
	//set sync
	xhttp.open("POST","/sendMessage",true);
	//send json data
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify({"message":message}));
	//focus to input field
	document.getElementById("inputMessage").focus()
    }
}

//set focus to input field
//document.getElementById("inputMessage").focus()
// Enter key
document.onkeydown=function(event){
    var code = event.keyCode;
    if(code ==13){ //key Enter
	//not change a new line after type Enter
	event.preventDefault();
	//call send message function
	sendMessage()
	//document.getElementById("inputMessage").focus()
    }
};

//set get user run every 1s
setInterval('getUser()', 1000);

