// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../../actions';
import Brush from '../../tools/Brush';
import Rect from '../../tools/Rect';
import Elaser from '../../tools/Elaser';
import './toolbar.css';

const ToolBar = () => {
    const { canvas } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="toolbar">
            <button onClick={e => dispatch( setTool(new Brush(canvas)) )} className={`toolbar__button toolbar__button_brush`}></button>
            <button onClick={e => dispatch( setTool(new Rect(canvas)) )} className="toolbar__button toolbar__button_rect"></button>
            <button className="toolbar__button toolbar__button_circle"></button>
            <button onClick={e => dispatch( setTool(new Elaser(canvas)) )} className="toolbar__button toolbar__button_elaser"></button>
            <button className="toolbar__button toolbar__button_line"></button>
            <input type="color" className="toolbar__button toolbar__button_colors"/>

            <button className="toolbar__button toolbar__button_undo" style={{'marginLeft' : 'auto'}}></button>
            <button className="toolbar__button toolbar__button_redo"></button>
            <button className="toolbar__button toolbar__button_save"></button>
        </div>
    )
}

export default ToolBar;

