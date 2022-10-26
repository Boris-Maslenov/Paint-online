import './button.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';


const Button = () => {
    const [text, setText] = useState('Пригласить друга');

    return (
        <CopyToClipboard text={window.location.href} onCopy={() => setText('Ссылка скопирована !')} >
            <button className="btn btn__color_main" type="button">
                <span className="btn__icon btn__icon_add">{text}</span>
            </button>
        </CopyToClipboard>
    )
}
export default Button;