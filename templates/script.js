let socket = io()
const form = document.getElementById('msg');
const messages = document.getElementById('messages');

form.send.onclick = function(e) {
    e.preventDefault();
    if (form.msg.value.trim()) {
        socket.emit('send', {id: window.localStorage.getItem('id'), msg: form.msg.value});
        form.msg.value = '';
    }
}
form.msg.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.send.dispatchEvent(new Event('click'));
    }
})

socket.on('send', (msg) => {
    messages.innerHTML += msg['id'] == window.localStorage.getItem('id') ? `<p id="my">${msg['msg']}</p>` : `<p>${msg['msg']}</p>`
})
socket.on('new', (msg) => {
    if(!window.localStorage.getItem('id')) {
        window.localStorage.setItem('id', Date.now());
    }
    msg.forEach(el => {
        messages.innerHTML += el['id'] == window.localStorage.getItem('id') ? `<p id="my">${el['msg']}</p>` : `<p>${el['msg']}</p>`
    });
    socket.emit('checkID', window.localStorage.getItem('id'));
})