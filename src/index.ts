import path from 'node:path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('./src'));

const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    console.log('__dirname: ', __dirname);
    res.render(path.join(__dirname));
});

io.on('connection', (socket) => {

    // Logs in the server when user is connected or disconnected
    console.log(socket.id, ' connected');
    socket.on('disconnect', () => {
        console.log(socket.id, ' disconnected');
    });

    // Receives messages from client
    // in the channel 'chat message' and
    // send it back to all users
    socket.on('chat message', (msg) => {
        console.log(msg.replace(/<b>|<\/b>/g, ''));
        io.emit('chat message', msg);
    });


    // Server receives the message 'world' from client
    // and send it back to all clients
    socket.on('hello', (arg) => {
        socket.emit('hello', arg);
    });

});

server.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);
});