import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCanvas, setTool, pushToUndo, setUserName } from '../../actions';
import Brash from '../../tools/Brush';
import Modal from '../Modal/Modal';


import './Canvas.css';

const Canvas = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const usernameRef = useRef();
    const username = useSelector(state=>state.username);
    const [ open, setOpen ] = useState(true);
    useEffect( () => {
        dispatch( createCanvas(canvasRef.current) );
        dispatch( setTool( new Brash(canvasRef.current))  );
        // eslint-disable-next-line
    }, [] );

    useEffect( () => {
        if(username) connect();
        // eslint-disable-next-line
    }, [username] );

    const onMouseDownHandler = () => {
        dispatch(pushToUndo( canvasRef.current.toDataURL() ));
    }

    const connect = () => {
        const socket = new WebSocket('ws://localhost:5000/');
        const data = {
            id: window.location.pathname.replace('/', ''),
            username: username,
            method: 'connection',
        }
        console.log(data);
        socket.onopen = () => {
            socket.send(JSON.stringify(data));
        } 

        socket.onmessage = (e) => {
            console.log(e.data);
        }
    }

    const connectHandler = (name) => {
            if( name.trim() !== '' && name.length > 3 ) {
                dispatch(setUserName(name));
                setOpen(false);
            }
    }

    return (
        <>
        <canvas onMouseDown={e => onMouseDownHandler(e)} ref={canvasRef}  width={700} height={500} className='canvas'></canvas>
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