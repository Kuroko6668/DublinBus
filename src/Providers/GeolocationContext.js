import { useContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const GeolocationContext = React.createContext();

export function useGeolocation() {
   return useContext(GeolocationContext);
}

// This components provides a context to share the stops across the different components in the application
export function GeolocationProvider({ children }) {
   const [position, setPosition] = useState(null);

   // Fetch the geolocation position every 10 seconds
   useEffect(() => {
      const interval = setInterval(getUserPosition(), 10000);
      return () => clearInterval(interval);
   }, []);

   // function that sets the state to the user position and
   // pans the map view to it
   function getUserPosition() {
      navigator.geolocation.getCurrentPosition(
         (pos) => {
            setPosition({
               lat: 53.306,
               lng: -6.21839,
            });
         },
         (error) => {
            setPosition({
               lat: 53.306,
               lng: -6.21839,
            });

         },
         {maximumAge:60000, timeout:5000, enableHighAccuracy:true}
       );
   }

   const value = {
      position,
   };

   return <GeolocationContext.Provider value={value}>{children}</GeolocationContext.Provider>;
}