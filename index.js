import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 3000;
const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

let messages = [];
let users = [];

app.use(express.static(__dirname + '/templates'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

socket.on('connection', (soc) => {
    console.log('New user connect');

    soc.emit('new', messages);
    soc.on('disconnect', () => {
        console.log("User disconnect");
    })
    soc.on('send', (msg) => {
        messages.push(msg);
        socket.emit('send', msg);
    })
    soc.on('checkID', (id) => {
        if (!users.includes(id)) users.push(id);
    })
})

server.listen(PORT, () => {
    console.log(`Server start: http://localhost:${PORT}`);
})
