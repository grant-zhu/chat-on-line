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
	    var liTag=ulTag.getElementsByTagName('li');
	    for (let i = message.length-1; i >= 0; i--){
		var chatMessage = message[i].username+': '+message[i].message;
		//liTag[messageCount-i].style.width='200px'
		//if current user's message
		if(message[i].username == username){
		    //do not show username 
		    var chatMessage = message[i].message;
		    liTag[messageCount-i].style.marginRight='60px';
		    liTag[messageCount-i].style.textAlign='right';
		    liTag[messageCount-i].style.backgroundColor='#b8db29';
		    liTag[messageCount-i].style.float='right';
		    liTag[messageCount-i].style.marginLeft='300px';		    
		    
		}
		else{
		    liTag[messageCount-i].style.marginLeft='60px';
		    liTag[messageCount-i].style.textAlign='left'
		    liTag[messageCount-i].style.backgroundColor='#EEE';
		    liTag[messageCount-i].style.float='left';
		    liTag[messageCount-i].style.marginRight='300px';	    	    
		}
		liTag[messageCount-i].innerHTML=chatMessage;
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
    if(code ==13){ //这是键盘的enter监听事件
	//call send message function
	sendMessage()
	//document.getElementById("inputMessage").focus()
    }
}
//set get user run every 2s
setInterval('getUser()', 1000)
//get User and message
