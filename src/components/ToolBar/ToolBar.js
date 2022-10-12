import './toolbar.css';

const ToolBar = () => {
    return (
        <div className="toolbar">
            <button className="toolbar__button toolbar__button_brush"></button>
            <button className="toolbar__button toolbar__button_rect"></button>
            <button className="toolbar__button toolbar__button_circle"></button>
            <button className="toolbar__button toolbar__button_elaser"></button>
            <button className="toolbar__button toolbar__button_line"></button>
            <input type="color" className="toolbar__button toolbar__button_colors"/>

            <button className="toolbar__button toolbar__button_undo" style={{'marginLeft' : 'auto'}}></button>
            <button className="toolbar__button toolbar__button_redo"></button>
            <button className="toolbar__button toolbar__button_save"></button>
        </div>
    )
}

export default ToolBar;

