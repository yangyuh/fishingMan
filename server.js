var express = require('express');
var path = require('path');
var app = express();
var serverport = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.listen(serverport, function() {
    console.log("server start " + serverport)
})