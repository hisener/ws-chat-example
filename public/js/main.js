var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);

ws.onmessage = function(event) {
  var chatbox = document.getElementById('chatbox');
  var div = document.createElement('div');
  div.innerHTML = JSON.parse(event.data);
  
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
};
