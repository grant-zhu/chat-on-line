//messages count in page
var messageCount = 4;
//get username
function getUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
	    username = this.responseText;
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
	    for (let i = 0; i < message.length; i++){
		var linode = document.createElement('li');
		//if current user's message
		if(message[i].username == username){
		    //do not show username
		    var chatMessage = message[i].message;		    
		    var textnode = document.createTextNode(chatMessage)
		    linode.appendChild(textnode)
		    linode.style.marginRight='60px';
		    linode.style.textAlign='right';
		    linode.style.backgroundColor='#b8db29';
		    linode.style.float='right';
		    linode.style.marginLeft='300px';		    
		}
		else{
		    var chatMessage = message[i].username+': '+message[i].message;		    
		    var textnode = document.createTextNode(chatMessage)
		    linode.appendChild(textnode)
		    linode.style.marginLeft='60px';
		    linode.style.textAlign='left'
		    linode.style.backgroundColor='#EEE';
		    linode.style.float='left';
		    linode.style.marginRight='300px';	    	    
		}
		ulTag.appendChild(linode)
		//if scrollTop in the bottom
		var scrollToBottom = messageBox.scrollHeight-messageBox.clientHeight-messageBox.scrollTop
		if( scrollToBottom < 50 ){
		    messageBox.scrollTop = messageBox.scrollTop+47;
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
    }
}

//set focus to input field
//document.getElementById("inputMessage").focus()
// Enter key
document.onkeydown=function(event){
    var code = event.keyCode;
    if(code ==13){ //key Enter
	//call send message function
	sendMessage()
	//document.getElementById("inputMessage").focus()
    }
};

//set get user run every 1s
setInterval('getUser()', 1000);

