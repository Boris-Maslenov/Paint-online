import './App.css';
import {useState} from 'react'
import Canvas from './components/Canvas/Canvas';
import SettingBar from './components/SettingBar/SettingBar';
import ToolBar from './components/ToolBar/ToolBar';

import Modal from './components/Modal/Modal';

function App() {
  const [ open, setOpen ] = useState(false);
  console.log(open);
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
      <Modal open={open} setOpen={setOpen}>
          <p>А это childrens</p>
      </Modal>

      <button onClick={e=>setOpen(true)}>cdsfdf</button>
    </div>
  );
}

export default App;