import { useDispatch, useSelector } from 'react-redux';
import { setTool, setFillColor } from '../../actions';
import Brush from '../../tools/Brush';
import Rect from '../../tools/Rect';
import Elaser from '../../tools/Elaser';
import Circle from '../../tools/Circle';
import Line from '../../tools/Line';
import './toolbar.css';

const ToolBar = () => {
    
    const { canvas, undoList } = useSelector(state => state);
    const dispatch = useDispatch();

    const onUndoHandler = (e) => {
        e.preventDefault();
        let ctx = canvas.getContext('2d');
        if(undoList.length > 0){
            let lastStep = undoList.pop();
            console.log(lastStep);
            let img = new Image();
            img.src = lastStep;
            console.log(img);
            img.onload = () => {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                ctx.drawImage(img,0,0,canvas.width, canvas.height);
            }
        } else {
            ctx.clearRect(0,0,canvas.width, canvas.height); 
        }
    }
    const onRedoHandler = (e) => {
        e.preventDefault();
        console.log('onRedoHandler');
    }
    const onSaveHandler = (e) => {
        e.preventDefault();
        console.log('onSaveHandler');
    }


    return (
        <div className="toolbar">
            <button onClick={e => dispatch( setTool(new Brush(canvas)) )} className={`toolbar__button toolbar__button_brush`}></button>
            <button onClick={e => dispatch( setTool(new Rect(canvas)) )} className="toolbar__button toolbar__button_rect"></button>
            <button onClick={e => dispatch( setTool(new Circle(canvas)) )} className="toolbar__button toolbar__button_circle"></button>
            <button onClick={e => dispatch( setTool(new Elaser(canvas)) )} className="toolbar__button toolbar__button_elaser"></button>
            <button onClick={e => dispatch( setTool(new Line(canvas)) )} className="toolbar__button toolbar__button_line"></button>
            <input onChange={e => dispatch( setFillColor(e.target.value) )} type="color" className="toolbar__button toolbar__button_colors"/>

            <button onClick={e => onUndoHandler(e)} className="toolbar__button toolbar__button_undo" style={{'marginLeft' : 'auto'}}></button>
            <button onClick={e => onRedoHandler(e)} className="toolbar__button toolbar__button_redo"></button>
            <button onClick={e => onSaveHandler(e)} className="toolbar__button toolbar__button_save"></button>
        </div>
    )
}

export default ToolBar;

