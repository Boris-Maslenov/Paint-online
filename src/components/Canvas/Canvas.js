import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCanvas, setTool, pushToUndo, setUserName, setSessionId, setSocket } from '../../actions';
import Modal from '../Modal/Modal';
import FetcRequest from '../../services/services';
import {Brush, Rect, Elaser, Line, Circle} from '../../tools'

import './Canvas.css';

const Canvas = () => {
    const request = new FetcRequest();
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const usernameRef = useRef();
    const {sessionid, username, canvas} = useSelector(state=>state);
    const [ open, setOpen ] = useState(true);

    console.log(sessionid, username, canvas);

    useEffect( () => {
        dispatch( createCanvas(canvasRef.current) );
        //dispatch( setTool( new Brash(canvasRef.current))  );
        // eslint-disable-next-line
    }, [] );

    useEffect( () => {
        if(username) {
            connect(); 
        } 
        // eslint-disable-next-line
    }, [username] );

    useEffect( () => {
        if(sessionid) {
            request.request( `http://localhost:5000/image?id=${sessionid}` ) 
            .then(response => {
                const ctx = canvasRef.current.getContext('2d');
                const img = document.createElement('img');
                img.src = response.data;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
            })
            .catch(e =>  console.log(e))
        } 
        // eslint-disable-next-line
    }, [sessionid] );

    const onMouseDownHandler = () => {
        dispatch(pushToUndo( canvasRef.current.toDataURL() ));
    }

    const onMouseUpHandler = (e) => {
        const payload = JSON.stringify({'img': canvasRef.current.toDataURL()});
        request.request( `http://localhost:5000/image?id=${sessionid}`, 'POST', payload)
            .then(response => console.log(response))
            .catch(e =>  console.log(e))
    }

    const connect = () => {
        const socket = new WebSocket('ws://localhost:5000/');
        const data = {
            id: window.location.pathname.replace('/', ''),
            username: username,
            method: 'connection',
        }
        dispatch(setSocket(socket));
        dispatch(setSessionId(data.id));
        const newBrash = new Brush(canvas, socket, data.id);
        dispatch( setTool( newBrash )  );
        socket.onopen = () => {
            socket.send(JSON.stringify(data));
        } 
        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            switch(msg.method) {
                case 'connection' :
                console.log(`Пользователь ${msg.username} подключился`);
                    break;
                case 'draw' :
                    drawHandler(msg);
                break;
                default: return msg;
            }
        }
    }
    
    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch(figure.type) {
            case 'brush' :
                Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width);
            break;
            case 'elaser' :
                Elaser.draw(ctx, figure.x, figure.y, figure.width);
            break;
            case 'line' :
                Line.staticDraw(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.color, figure.width);
            break;
            case 'rect' :
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
            break;
            case 'circle' :
                Circle.staticDraw(ctx, figure.x, figure.y, figure.w, figure.color, figure.width);
            break;
            case 'finish' :
                ctx.beginPath();
            break;
            default :
            return null;
        }
    }

    const connectHandler = (name) => {
            if( name.trim() !== '' && name.length > 3 ) {
                setOpen(false);
                dispatch(setUserName(name));
            }
    }

    return (
        <>
        <canvas onMouseUp={e => onMouseUpHandler(e)} onMouseDown={e => onMouseDownHandler(e)} ref={canvasRef}  width={700} height={500} className='canvas'></canvas>
            <Modal open={open} setOpen={setOpen}>
                <h4>Нужно представиться</h4>
                <input ref={usernameRef} type="text" placeholder="ВАся" />
                <button onClick={e=> connectHandler(usernameRef.current.value)} type="button">Войти</button>
            </Modal>
        </>
    )
}

export default Canvas;