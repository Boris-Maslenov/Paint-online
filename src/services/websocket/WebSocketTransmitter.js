export class WebSocketTransmitter {
    static transmit(socket, data){
        socket.send( JSON.stringify( data ) );
    }
}