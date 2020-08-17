const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const zmq = require("zeromq/v5-compat");

var subMVML = zmq.socket('sub');
var pubCMD = zmq.socket('pub');

var IP = "127.0.0.1";


subMVML.connect('tcp://' + IP + ':3000');
subMVML.subscribe('');
pubCMD.connect('tcp://' + IP + ':2000');

server.listen(8080, () => {
    console.log('Listening on localhost:8080')
})

// Routing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
    console.log('get root')
});

function appGet(chemin) {
    app.get(chemin, function (req, res) {
        res.sendFile(__dirname + chemin);
    });
}

appGet('/css/styles.css');
appGet('/js/client.js');

io.sockets.on('connection', function (socket) {
    console.log('connected !');
    socket.on('disconnect', function () {
        console.log('disconnected');
        socket.disconnect(true);
    });

    socket.on('cmd', function (msg) {
        pubCMD.send(msg);
    });

    subMVML.on('message', function (msg) {
        let msgrun = JSON.parse(msg)
        io.sockets.emit('msg',msgrun);
    });
});
