import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setColor, pushToRedo, pushToUndo } from '../../actions';
import { Tooltip, Box } from '@mui/material';
import SelectWidth from '../SelectWidth/SelectWidth';
import './toolbar.css';

const ToolBar = () => {
    const { canvas, undoList, redoList, sessionId, tool } = useSelector(state => state);
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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

    const element = '& #' + tool.toLowerCase();
    const materialStyle = {
                            width: '100%',
                                [element] : {
                                    border: '2px solid red'
                                }
            }

    return (
        <Box sx={materialStyle} > 

            <div className="toolbar" >    
                <Tooltip title="Кисть" arrow >
                            <button id="brush" onClick={e => dispatch( setTool('BRUSH') )} className={`toolbar__button toolbar__button_brush`}></button>
                </Tooltip>
                
                <Tooltip title="Прямоугольник" arrow>
                    <button id="rect" onClick={e => dispatch( setTool('RECT') )} className="toolbar__button toolbar__button_rect"></button>
                </Tooltip>
                
                <Tooltip title="Окружность">
                    <button id="circle" onClick={e => dispatch( setTool('CIRCLE') )} className="toolbar__button toolbar__button_circle toolbar__button_border"></button>
                </Tooltip>

                <Tooltip title="Ластик">
                    <button id="elaser" onClick={e => dispatch( setTool('ELASER') )} className="toolbar__button toolbar__button_elaser"></button>
                </Tooltip>

                <Tooltip title="Прямая линия">
                    <button id="line" onClick={e => dispatch( setTool('LINE') )} className="toolbar__button toolbar__button_line toolbar__button_border"></button>
                </Tooltip>

                <div className="toolbar__button toolbar__button_width toolbar__button_dropdown">
                    <Tooltip title="Толщина кисти" arrow>
                        <div id="width" className="dropdown" onClick={e => openHandler(e, true)}>          
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
        </Box>
        
    )
}

export default ToolBar;