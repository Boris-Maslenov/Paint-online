import { useDispatch, useSelector } from 'react-redux';
import { setTool, setFillColor, pushToRedo, pushToUndo } from '../../actions';
import Brush from '../../tools/Brush';
import Rect from '../../tools/Rect';
import Elaser from '../../tools/Elaser';
import Circle from '../../tools/Circle';
import Line from '../../tools/Line';
import './toolbar.css';

const ToolBar = () => {
    const { canvas, undoList, redoList, socket, sessionid } = useSelector(state => state);
    const dispatch = useDispatch();
    const onUndoHandler = (e) => {
        e.preventDefault();
        let ctx = canvas.getContext('2d');
        if(undoList.length > 0){
            let lastStep = undoList.pop();
            dispatch( pushToRedo(canvas.toDataURL()) );
            let img = new Image();
            img.src = lastStep;
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
        let ctx = canvas.getContext('2d');
        if(redoList.length > 0){
            let lastStep = redoList.pop();
            dispatch( pushToUndo(canvas.toDataURL()) );
            let img = new Image();
            img.src = lastStep;
            img.onload = () => {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                ctx.drawImage(img,0,0,canvas.width, canvas.height);
            }
        }
        
    }
    const onSaveHandler = (e) => {
        e.preventDefault();
        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = sessionid + '.jpg';
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <div className="toolbar">
            <button onClick={e => dispatch( setTool(new Brush(canvas, socket, sessionid)) )} className={`toolbar__button toolbar__button_brush`}></button>
            <button onClick={e => dispatch( setTool(new Rect(canvas, socket, sessionid)) )} className="toolbar__button toolbar__button_rect"></button>
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