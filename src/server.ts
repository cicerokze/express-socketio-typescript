import path from 'node:path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express, { Request, Response } from 'express';
import cors from 'cors';

const port = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

io.on('connection', (socket) => {

    // Logs in the server when user is connected or disconnected
    console.log(socket.id, ' connected');
    socket.on('disconnect', () => {
        console.log(socket.id, ' disconnected');
    });

    // Receives messages from client
    // in the Event 'chat message' and
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