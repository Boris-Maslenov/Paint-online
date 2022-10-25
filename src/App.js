import './App.css';
import Canvas from './components/Canvas/Canvas';
import AppHeader from './components/AppHeader/AppHeader';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';


function App() {
  // console.log('App');
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
          <div className="container">
              <Canvas />
          </div>
      </div>
          <div className="add-friends">
                <Button />                 
          </div>
            <Footer />
    </div>
  );
}

export default App;