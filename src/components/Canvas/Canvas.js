import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCanvas, setTool, pushToUndo, setUserName, setSessionId, setSocket } from '../../actions';
import FetcRequest from '../../services/services';
import Modal from '../Modal/Modal';
import Brash from '../../tools/Brush';
import Rect from '../../tools/Rect';
import Elaser from '../../tools/Elaser';
import Line from '../../tools/Line';


import './Canvas.css';

const Canvas = () => {
    const request = new FetcRequest();
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const usernameRef = useRef();
    const sessionid = useSelector(state=>state.sessionid);
    const username  = useSelector(state=>state.username);
    const [ open, setOpen ] = useState(true);

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
            console.log(sessionid);
            request.request( `http://localhost:5000/image?id=${sessionid}` ) 
            .then(response => {
                const ctx = canvasRef.current.getContext('2d');
                const img = document.createElement('img');
                // const data = JSON.parse(response);
                 console.log(response);
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
        const data = JSON.stringify( {img: canvasRef.current.toDataURL()} );
        request.request( `http://localhost:5000/image?id=${sessionid}`, 'POST', data ) 
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
        const newBrash = new Brash(canvasRef.current, socket, data.id);
        dispatch( setTool( newBrash )  );
        socket.onopen = () => {
            //console.log(data); //{id: 'f183dc4bfa83', username: 'dddddd', method: 'draw'}
            socket.send(JSON.stringify(data));
        } 
        socket.onmessage = (e) => {

            let msg = JSON.parse(e.data);

            switch(msg.method) {
                case 'connection' :
                console.log(`Пользователь ${msg.username} подключился`);
                    break;
                case 'draw' :
                    console.log(msg);
                    drawHandler(msg);
                break;

                default: return msg;
            }
        }
    }
    
    const getCtx = (ctx) => {
         return  {
                color: ctx.strokeStyle,
                style: ctx.lineWidth,
            }
    }
    const setCtx = (ctx, CW) => {
        ctx.strokeStyle = CW.color;
        ctx.fillStyle = CW.color;
        ctx.lineWidth = CW.style;
    }

    const drawHandler = (msg) => {

        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');

        switch(figure.type) {

            case 'brush' :
                const brushCW = getCtx(ctx);
                Brash.draw(ctx, figure.x, figure.y, figure.color, figure.width);
                setCtx(ctx, brushCW);
            break;
            case 'elaser' :
                const eliserCW = getCtx(ctx);
                Elaser.draw(ctx, figure.x, figure.y, figure.width);
                setCtx(ctx, eliserCW);
            break;
            case 'line' :
                const lineCW = getCtx(ctx);
                Line.staticDraw(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.color, figure.width);
                setCtx(ctx, lineCW);
            break;
            case 'rect' :
                const rectCW = getCtx(ctx);
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                setCtx(ctx, rectCW);
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
            {/* <button onClick={e=>setOpen(true)}>cdsfdf</button>  */}
        </>
    )
}

export default Canvas;