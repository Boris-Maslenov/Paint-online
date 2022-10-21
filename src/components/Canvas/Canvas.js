import { useEffect,  useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCanvas, setTool, pushToUndo, setUserName, setSessionId, setSocket, setUserId } from '../../actions';
import Modal from '../Modal/Modal';
import FetcRequest from '../../services/FetcRequest';
import { toolsFactory } from '../../services/toolsFactory';
import {Brush, Rect, Elaser, Line, Circle} from '../../tools';

import './Canvas.css';

const Canvas = () => {
    console.log('Canvas render');
    const [ open, setOpen ] = useState(true);
    const canvasRef = useRef();
    const usernameRef =  useRef();
    const dispatch = useDispatch();
    const { tool, color, width, userId, socket, canvas } = useSelector(state=>state);

    // const TOOLS_MAP = {
    //         'BRUSH' : Brush,
    //         'RECT' : Rect,
    //         'ELASER' : Elaser,
    //         'LINE' : Line,
    //         'CIRCLE' : Circle,
    // }

    // const params = {
    //     canvas: canvasRef.current,
    //     color,
    //     width,
    //     socket,
    // }

    useEffect( () => {
        dispatch( createCanvas(canvasRef.current) );
         // eslint-disable-next-line
    },[] );

    useEffect( () => {
        if(userId){
            canvasHandler(canvas);
        }
         // eslint-disable-next-line
    },[userId, tool, color, width] );

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

    function mouseDownHandler(e) {
        mouseDown = true;
        ctx.beginPath()
        startX = e.pageX - e.target.offsetLeft;
        startY = e.pageY - e.target.offsetTop;
    }

    function mouseUpHandler(e) {
        mouseDown = false;
    }

    function mouseMoveHandler(e) {
        if(mouseDown){
            currentX = e.pageX - e.target.offsetLeft;
            currentY = e.pageY - e.target.offsetTop;
            const params =  {
                    method: 'DRAW',
                    ctx: ctx,
                    type: 'BRUSH',
                        figure: {
                            startX: startX,
                            startY: startY,
                            currentX: currentX,
                            currentY: currentY,
                            color: color,
                            width: width,
                        }
            }
            toolsFactory.init(params);
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
        console.log('drawHandler ', msg);
    }

    const webSocketConnect = (data) => {
        socket.onopen = () => {
            socket.send(JSON.stringify({...data, method: 'connection'}));
        } 
        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            switch(msg.method) {
                case 'connection' :
                console.log(`Пользователь ${msg.userName} подключился`);
                    break;
                case 'draw' :
                    //drawHandler(msg);
                break;
                default: return msg;
            }
        }
        
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