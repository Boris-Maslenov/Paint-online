import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createCanvas } from '../../actions';

// import Brush from '../../tools/Brush';

import './Canvas.css';

const Canvas = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef();

    useEffect( () => {

        dispatch( createCanvas(canvasRef.current) );
        //dispatch( setTool( new Brush(canvasRef.current) ));
        // eslint-disable-next-line
    }, [] );

    return (

        <canvas ref={canvasRef}  width={700} height={500} className='canvas'></canvas>

    )
}

export default Canvas;