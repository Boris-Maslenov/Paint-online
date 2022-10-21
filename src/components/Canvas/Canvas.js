import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCanvas, pushToUndo, setUserName, setSessionId, setUserId, setSocket } from '../../actions';
import Modal from '../Modal/Modal';
import FetcRequest from '../../services/FetcRequest';
import { toolsFactory } from '../../services/toolsFactory';
import { WebSocketTransmitter } from '../../services/websocket/WebSocketTransmitter';
import { WebSocketReceiver } from '../../services/websocket/webSocketReceiver';

import './Canvas.css';

const Canvas = () => {
    console.log('Рендер Canvas...');
    const req = new FetcRequest();
    const [ open, setOpen ] = useState(true);
    const canvasRef = useRef();
    const usernameRef =  useRef();
    const dispatch = useDispatch();
    const { tool, color, width, userId, canvas, sessionId, socket } = useSelector(state=>state);
   
    useEffect( () => {
        dispatch( createCanvas(canvasRef.current) );
         // eslint-disable-next-line
    },[] );

    useEffect( () => {
        if(userId){
            canvasHandler(canvas);
            getCanvasState();
        }
         // eslint-disable-next-line
    },[userId, tool, color, width] );


const getCanvasState = () => {

    req.request( `http://localhost:5000/image?id=${sessionId}` ) 
    .then(response => {
        const ctx = canvasRef.current.getContext('2d');
        const img = document.createElement('img');
        img.src = response.data;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    })
    .catch(e =>  console.log(e));

}


const canvasHandler = (canvas) => {
    const ctx = canvas.getContext('2d');
    let mouseDown = false;

    canvas.onmousemove = mouseMoveHandler;
    canvas.onmousedown = mouseDownHandler;
    canvas.onmouseup = mouseUpHandler;

    let startX;
    let startY;
    let currentX;
    let currentY;

    let saved;

    function mouseDownHandler(e) {
        mouseDown = true;
        saved = canvas.toDataURL();
        ctx.beginPath();
        startX = e.pageX - e.target.offsetLeft;
        startY = e.pageY - e.target.offsetTop;

        dispatch(pushToUndo( canvasRef.current.toDataURL() ));
    }

    function mouseUpHandler(e) {
        mouseDown = false;
        ctx.beginPath();
        const params = {
                method: 'DRAW',
                tool: tool,
                    figure: {
                        type: 'FINISH',
                    }
        }

        WebSocketTransmitter.transmit(socket, {...params,  userId, sessionId} );

        const payload = JSON.stringify({'img': canvasRef.current.toDataURL()});
        req.request( `http://localhost:5000/image?id=${sessionId}`, 'POST', payload)
            .then(response => console.log(response))
            .catch(e =>  console.log(e))
    }

    function mouseMoveHandler(e) {
        if(mouseDown){
            currentX = e.pageX - e.target.offsetLeft;
            currentY = e.pageY - e.target.offsetTop;
            const params =  {
                    method: 'DRAW',
                    tool: tool,
                    saved: saved,
                        figure: {
                            type: 'DRAING',
                            startX: startX,
                            startY: startY,
                            currentX: currentX,
                            currentY: currentY,
                            color: color,
                            width: width,
                        }
            }
            toolsFactory.init(params, canvas);
            WebSocketTransmitter.transmit(socket, {...params,  userId, sessionId} );
        }
    }
}

    const userAuthorization = (userName) => {

            const data = {
                sessionId: window.location.pathname.replace('/', ''),
                userId: `u${Date.now().toString(8)}`,
                userName,
            }

            dispatch(setUserName(userName));
            dispatch(setSessionId(data.sessionId));
            dispatch(setUserId(data.userId));

            webSocketConnect(data);

    }

    const authorizationHandler = (userName) => {
        if( userName.trim() !== '' && userName.length > 3 ) {
            setOpen(false);
            userAuthorization(userName);
        }
    }

    const drawHandler = (msg) => {
        WebSocketReceiver.recive(msg, canvas);
    }

    const webSocketConnect = (data) => {
        const socket = new WebSocket('ws://localhost:5000/'); 
        socket.onopen = () => {
            socket.send(JSON.stringify({...data, method: 'CONNECTION'}));
        } 

        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            switch(msg.method) {
                case 'CONNECTION' :
                console.log(`Пользователь ${msg.userName} подключился`);
                    break;
                case 'DRAW' :
                    drawHandler(msg);
                break;
                default: return msg;
            }
        }

        dispatch(setSocket(socket));  

    }

    return (
        <>
            <canvas ref={canvasRef} width={700} height={500} className='canvas'></canvas>
                <Modal open={open} setOpen={setOpen}>
                    <h4>Нужно представиться</h4>
                    <input ref={usernameRef} type="text" placeholder="Борис" />
                    <button onClick={e=> authorizationHandler(usernameRef.current.value)}  type="button">Войти</button>
                </Modal>
        </>
    )

}

export default Canvas;