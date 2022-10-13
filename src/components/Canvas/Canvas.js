import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createCanvas, setTool, pushToUndo } from '../../actions';
import Brash from '../../tools/Brush';


import './Canvas.css';

const Canvas = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef();
    useEffect( () => {
        dispatch( createCanvas(canvasRef.current) );
        dispatch(setTool( new Brash(canvasRef.current))  );
        // eslint-disable-next-line
    }, [] );

    const onMouseDownHandler = () => {
        dispatch(pushToUndo( canvasRef.current.toDataURL() ));
    }

    return (

        <canvas onMouseDown={e => onMouseDownHandler(e)} ref={canvasRef}  width={700} height={500} className='canvas'></canvas>

    )
}

export default Canvas;