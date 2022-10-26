import './App.css';
import { SnackbarProvider } from 'notistack';
import Canvas from './components/Canvas/Canvas';
import AppHeader from './components/AppHeader/AppHeader';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';


function App() {

  return (
    <div className="App">
      <AppHeader />
      <div className="main">
          <div className="container">
            <SnackbarProvider maxSnack={3}>
                <Canvas />
            </SnackbarProvider>
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