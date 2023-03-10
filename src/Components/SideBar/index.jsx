import { useState } from "react";
import { useGeolocation } from "../../Providers/GeolocationContext";
import { useGoogleMap } from "@react-google-maps/api";
import { Button, Box } from "@material-ui/core";
import "./style.css";
import Planner from "../Planner/Index";
import SearchRoute from "../SearchRoute";
import NearMe from "../NearMe";
//ßimport Weather from '../Weather';
// This is the main component for the NearMe section
const SideBar = () => {
  const [showPlanner, setShowPlanner] = useState(false);
  var setValue = (val) => {
    setShowPlanner(val);
  };
  const [showSearchRoute, setShowSearchRoute] = useState(false);
  var setSearchRouteValue = (val) => {
    setShowSearchRoute(val);
  };
  const [showNearMe, setShowNearMe] = useState(false);
  var setNearMeValue = (val) => {
    setShowNearMe(val);
   }
   const sideButtons=(<><div class="sideButtons" data-testid="plannerButton">
   <Button variant="contained" onClick={()=>setValue(true)}>
    Planner
   </Button>
   </div>
   <div class="sideButtons" onClick={()=>setNearMeValue(true)} id="nearMe">
   <Button variant="contained">
    Near Me
   </Button>
   </div>
  <div class="sideButtons">
   <Button variant="contained" onClick={()=>setSearchRouteValue(true)} id="searchRoute">
    Search Route
    </Button>
    </div></>)
  
   return (
     <>
      <div id="sideBar" >
          {showPlanner||showSearchRoute||showNearMe?showPlanner?<Planner back={setValue}></Planner>:showSearchRoute?<SearchRoute back={setSearchRouteValue}>
          </SearchRoute>:<NearMe back={setNearMeValue}></NearMe>:sideButtons}
   
      </div>
    </>
  );
};

export default SideBar;
