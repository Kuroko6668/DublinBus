import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Map from './Components/Map'
import {StopsProvider} from './Providers/StopsContext'
import {GeolocationProvider} from './Providers/GeolocationContext'

function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <StopsProvider>
        <GeolocationProvider>
          <Map/>
        </GeolocationProvider>  
      </StopsProvider>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
      
      </header> */}

    </div>
  );
}

export default App;
