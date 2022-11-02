import './appHeader.css';
import ToolBar from '../ToolBar/ToolBar';

const AppHeader = () => {
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header__line">
                    <ToolBar />
                </div>
            </div>
        </div>
    )
}

export default AppHeader;

