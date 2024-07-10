const socket = io();
console.log('cliente.js is loaded');

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on('connect', () => {
    console.log('socket.id: ', socket.id);
    sendMsg();
    sendGlobalMsg(
        socket.id,
        'Bem vindo!',
    );
});

socket.on('chat message', (msg) => {
    console.log('chat message, msg: ', msg.replace(/<b>|<\/b>/g, ''));
    const li = document.createElement('li');
    li.innerHTML = msg;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});

function sendMsg() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            console.log('input.value: ', input.value);
            socket.emit('chat message', `<b>${socket.id}</b>: ` + input.value);
            input.value = '';
        }
    });
}

//Client sent a message 'world' to the server
function sendGlobalMsg(senderId, msg) {
    socket.emit('hello', `${senderId}: ${msg}`);
    socket.on('hello', (arg) => {
        console.log('hello, arg: ', arg);
    });
}