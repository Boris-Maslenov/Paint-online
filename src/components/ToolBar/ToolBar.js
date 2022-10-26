import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setColor, pushToRedo, pushToUndo } from '../../actions';
import {Tooltip, Slider} from '@mui/material';
import SelectWidth from '../SelectWidth/SelectWidth';
import './toolbar.css';

const ToolBar = () => {

        const { canvas, undoList, redoList, sessionId } = useSelector(state => state);
        const dispatch = useDispatch();

        const [open, setOpen] = useState(false);

        const openHandler = (e, status) => {
            e.stopPropagation();
            setOpen(status);
        }

        

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
        a.download = sessionId + '.jpg';
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <div className="toolbar">

            <Tooltip title="Кисть" arrow>
                <button onClick={e => dispatch( setTool('BRUSH') )} className={`toolbar__button toolbar__button_brush`}></button>
            </Tooltip>
            <Tooltip title="Прямоугольник" arrow>
                <button onClick={e => dispatch( setTool('RECT') )} className="toolbar__button toolbar__button_rect"></button>
            </Tooltip>
            <Tooltip title="Окружность">
                <button onClick={e => dispatch( setTool('CIRCLE') )} className="toolbar__button toolbar__button_circle toolbar__button_border"></button>
            </Tooltip>
            <Tooltip title="Ластик">
                <button onClick={e => dispatch( setTool('ELASER') )} className="toolbar__button toolbar__button_elaser"></button>
            </Tooltip>
            <Tooltip title="Прямая линия">
                <button onClick={e => dispatch( setTool('LINE') )} className="toolbar__button toolbar__button_line toolbar__button_border"></button>
            </Tooltip>
            
            <div className="toolbar__button toolbar__button_dropdown">
                <Tooltip title="Толщна кисти" arrow>
                    <div className="dropdown" onClick={e => openHandler(e, true)}>          
                    </div>
                </Tooltip>
                   <SelectWidth open={open} fn={openHandler} />
            </div>

            <Tooltip title="Цвет">
                <input onChange={e => dispatch( setColor(e.target.value) )} type="color" className="toolbar__button toolbar__button_colors toolbar__button_border"/>
            </Tooltip>
            <Tooltip title="Отменить">
                <button onClick={e => onUndoHandler(e)} className="toolbar__button toolbar__button_undo toolbar__button_border" style={{'marginLeft' : 'auto'}}></button>
            </Tooltip>
            <Tooltip title="Повторить">
                <button onClick={e => onRedoHandler(e)} className="toolbar__button toolbar__button_redo"></button>
            </Tooltip>
            <Tooltip title="Сохранить">
                <button onClick={e => onSaveHandler(e)} className="toolbar__button toolbar__button_save toolbar__button_border"></button>
            </Tooltip>

        </div>
    )
}

export default ToolBar;