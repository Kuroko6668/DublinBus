import { useContext, useEffect, useState } from "react";
import React from "react";
import { reqAllStops } from "../ajax";

const StopsContext = React.createContext();

export function useStops() {
   return useContext(StopsContext);
}


// This components provides a context to share the stops across the different components in the application
export function StopsProvider({ children }) {
    const [value, setValue] = useState(null);
    useEffect(()=>{
        let getStops = async () => {
            const temp = await reqAllStops()
            setValue(temp)
        };
        getStops()
    },[])
   // Fetch the data for the lines or for the stops
//    const value =  reqAllStops().then(
//        value => {
//         console.log('stops',value);
        
//        },
//        err => {
//         alert(err.message)
//         console.log('123');
//         return <StopsContext.Provider>{children}</StopsContext.Provider>;
//        }
//    )
    if(value != null){
        return <StopsContext.Provider value={value}>{children}</StopsContext.Provider>;
    }else{
        return <StopsContext.Provider value={"Loading..."}>{children}</StopsContext.Provider>;
    }
   

}