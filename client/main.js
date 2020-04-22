const socket  = io.connect('http://192.168.0.123:6677', { 'forceNew': true });

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render( data ) {
    let html = data.map(( message,index ) => {
        return (`
           <div id="message">
            <strong>${message.nickname}</strong>
            <p>${message.text}</p>
           </div> 
        `);
    }).join('  ');

    console.log("HTML");
    console.log(html);

    let div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html ;
    div_msgs.scrollTop = div_msgs.scrollHeight;

}


function addMessage( e ) {
    const message = {
      nickname: document.getElementById('nickname').value,
      text:     document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';

    socket.emit('add-message', message);

    return false;
}