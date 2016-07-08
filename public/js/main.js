var host = location.origin.replace(/^http/, 'ws');
var client = new WebSocket(host);

var textbox = document.getElementsByTagName('input')[0];
var button = document.getElementsByTagName('button')[0];

client.onmessage = function(message) {

  if (message.data === 'loginSuccess') {
    button.innerHTML = 'Send';
    textbox.placeholder = 'Message';
    textbox.parentElement.className += ' has-success';
    return;

  } else if (message.data === 'loginFailed') {
    textbox.parentElement.className += ' has-error';
    return;
  }

  var chatbox = document.getElementById('chatbox');
  var div = document.createElement('div');
  div.innerHTML = message.data.replace(/(@\w+)/ig, '<b>$1</b>');
  
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
};

function send() {

  var message = {
    type: 'message',
    data: textbox.value
  };
  

  if (button.innerHTML === 'Login') {
    message.type = 'login';
  }
  
  client.send(JSON.stringify(message));
  textbox.value = '';
};

button.onclick = send;

textbox.onkeypress = function(event) {
  if (event.charCode === 13)
    send();
}
