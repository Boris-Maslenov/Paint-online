import { useDispatch } from 'react-redux';
import { setWidth } from '../../actions';

const SettingBar = () => {

    const dispatch = useDispatch();

    return (
        <div className="settingbar">
            <input defaultValue={1} min={1} max={50} onChange={e => dispatch(setWidth(e.target.value))} type="number" />
        </div>
    )
}

export default SettingBar;