const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

/**
 * Listen on event 'connect' and logs to server
 * checking when connection is successfully established
 */
socket.on('connect', () => {
    renderGlobalMsg(socket.id, ' connected');
});

/**
 * Listen on event 'global-chat' and renders
 * all messages in the screen of any client to all clients
 */
socket.on('global-chat', (msg) => {
    const li = document.createElement('li');
    li.innerHTML = msg;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});

/**
 * Send input message on the event 'global-chat' for all clients
 * @param {string} senderId 
 * @param {string} msg 
 */
function renderGlobalMsg(senderId, msg) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit('global-chat', `<b>${socket.id}</b>: ${input.value}`);
            input.value = '';
        };
    });
};