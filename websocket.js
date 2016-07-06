var WebSocketServer = require('ws').Server;

module.exports = (server) => {

  var wss = new WebSocketServer({ server: server });

  wss.on('connection', function(socket) {
    var id = setInterval(function() {
      socket.send(JSON.stringify(new Date()));
    }, 1000);

    console.log("websocket connection open");

    socket.on("close", function() {
      console.log("websocket connection close");
      clearInterval(id);
    });
  });

}
