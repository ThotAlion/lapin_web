socket = io.connect('127.0.0.1:80');

socket.on('disconnect', function () {
    socket.close();
});
