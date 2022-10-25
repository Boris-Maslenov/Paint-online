import './appHeader.css';
import ToolBar from '../ToolBar/ToolBar';
import SettingBar from '../SettingBar/SettingBar';

const AppHeader = () => {
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header__line">
                    <ToolBar />
                </div>
                {/* <div className="app-header__line">
                    <SettingBar />
                </div> */}
            </div>
        </div>
    )
}

export default AppHeader;

