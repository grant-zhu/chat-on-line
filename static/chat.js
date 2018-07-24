
//send message button click
function sendMessage(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  // messageContent=document.getElementById('message').innerHTML
	  username=this.responseText
	  inputMessage=document.getElementById("inputMessage").value
	  chatMessage = username+': '+inputMessage
	  var liNode = document.createElement("li");                 // Create a <li> node
	  var textnode = document.createTextNode(chatMessage);         // Create a text node
	  liNode.appendChild(textnode);                              // Append the text to <li>
	  document.getElementById("message").appendChild(liNode);     // Append <li> to <ul> with id="myList"
	  document.getElementById("inputMessage").value=''

    }
  };
  //set sync
  xhttp.open("GET", "/getUsername", true);
  xhttp.send();
}
