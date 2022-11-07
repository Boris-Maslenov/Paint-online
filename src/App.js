import './App.css';
import { SnackbarProvider } from 'notistack';
import Canvas from './components/Canvas/Canvas';
import Error from './components/Error/Error';
import AppHeader from './components/AppHeader/AppHeader';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';

const screenWidth = document.documentElement.offsetWidth;


function App() {

  if(screenWidth < 768) return <Error />;

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