import './App.css';
import NavBar from './Components/NavBar';
import Planner from './Components/Planner/Index';
import Map from './Components/Map'
import {StopsProvider} from './Providers/StopsContext'
import {GeolocationProvider} from './Providers/GeolocationContext'
import MarkerUserPosition from './Components/MarkerUserPosition';
import NearMe from './Components/NearMe';
import SearchRoute from './Components/SearchRoute';
function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <StopsProvider>
        <GeolocationProvider>
          <Map>
            <MarkerUserPosition/>
            {/* <Planner/>
            <NearMe/> */}
            <SearchRoute/>
          </Map>
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
