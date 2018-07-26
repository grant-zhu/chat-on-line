
//get username
function getUser(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
	    username = this.responseText
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
    //delete all message
    deleteALlMessage()
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
	//parse to JSON  
	message = JSON.parse(this.responseText)
	//trverse message directory
	for (let i = message.length-1; i >= 0; i--){
	    chatMessage = message[i].username+': '+message[i].message
	    var liNode = document.createElement("li");                 // Create a <li> node
	    var textnode = document.createTextNode(chatMessage);         // Create a text node
	    liNode.appendChild(textnode);                              // Append the text to <li>
	    document.getElementById("message").appendChild(liNode);     // Append <li> to <ul> with id="myList"

	}
    }
  };
  //set sync
  xhttp.open("GET", "/getMessage", true);
  xhttp.send();
}

//delete all message
function deleteALlMessage(){
    var messageDivNode =  document.getElementById("message");
    while(messageDivNode.hasChildNodes())
    {
	messageDivNode.removeChild(messageDivNode.lastChild);
    }
}

//send message
function sendMessage(){
    message = document.getElementById("inputMessage").value
    //empty input message
    document.getElementById("inputMessage").value=''
    //send message
    var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function(){
    // 	if(this.readyState == 4 && this.status == 200){
    // 	    //alert('send message success')
    // 	}
    // };
    
    //set sync
    xhttp.open("POST","/sendMessage",true);
    //send json data
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({"message":message}));    
        
}

//set get user run every 2s
setInterval('getUser()', 1000)
//get User and message
