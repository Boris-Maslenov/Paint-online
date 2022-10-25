import './button.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const Button = () => {
    return (
        <CopyToClipboard text={window.location.href} onCopy={() => console.log('скопировано')} >
            <button className="btn btn__color_main" type="button">
                <span className="btn__icon btn__icon_add">Пригласить друга</span>
            </button>
        </CopyToClipboard>
    )
}
export default Button;