import './App.css';
import Canvas from './components/Canvas/Canvas';
import SettingBar from './components/SettingBar/SettingBar';
import ToolBar from './components/ToolBar/ToolBar';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <div className="header__line">
            <ToolBar/>
          </div>
          <div className="header__line">
            <SettingBar/>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <Canvas/>
        </div>
      </div>
    </div>
  );
}

export default App;