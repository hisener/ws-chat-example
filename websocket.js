var WebSocketServer = require('ws').Server;

module.exports = (server) => {

  var wss = new WebSocketServer({ server: server });
  
  wss.broadcast = function(data) {
    wss.clients.forEach(function(client) {
      client.send(data);
    });
  };
  
  wss.isUsernameAvailable = function(str) {
    if (! str)
      return false;

    for (let client of wss.clients) {
      if (client.username == str)
        return false;
    }
    return true;
  }

  wss.on('connection', function(socket) {
    
    socket.on('message', function(message) {
      try {
        message = JSON.parse(message);
      } catch (e) {
        console.log(e.message);
      }
      
      switch(message.type) {
        case 'login':
          if (wss.isUsernameAvailable(message.data)) {
            socket.username = message.data;
            socket.send('loginSuccess');
            wss.broadcast('@' + message.data + ' logged in.');
          } else {
            socket.send('loginFailed');
          }
          break;
        case 'message':
          wss.broadcast('@' + socket.username + ': ' + message.data);
          break;
      }
    });
    
    socket.on('close', function () {
      wss.broadcast('@' + socket.username + ' logged out.');
    });

  });

}
