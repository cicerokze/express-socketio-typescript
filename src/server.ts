import path from 'node:path';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express, { Request, Response } from 'express';
import cors from 'cors';

const port = process.env.PORT || 8080;
const app = express();
const httpServer = createServer(app);
const wsServer = new Server(httpServer);

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

/**
 * Listen on event 'connection' when any client logs in.
 * Get access to socket to manage its properties
 */
wsServer.on('connection', (socket) => {

    /**
     * Create an event with name 'global-chat' to
     * log on a broadcast when any client is connected
     */
    wsServer.emit('global-chat', `${socket.id} connected`); 

    /**
     * Receives messages from client
     * on the event 'global-chat' and
     * send it back to all users
     */
    socket.on('global-chat', (msg) => {
        wsServer.emit('global-chat', msg);
    });

    /**
     * Listen on event 'disconnect' when any client logs out.
     * Forward it to event 'global-chat' adding info 'socket.id'
     * and its status 'disconnected'
     */
    socket.on('disconnect', () => {
        wsServer.emit('global-chat', `${socket.id} disconnected`);
    });
});

httpServer.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);
});