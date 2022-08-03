import { useContext, useEffect, useState } from "react";
import React from "react";
import { reqAllStops } from "../ajax";
import memoryUtils from "../utils/memoryUtils";
import storageUtils from "../utils/storageUtils";

const StopsContext = React.createContext();

export function useStops() {
   return useContext(StopsContext);
}


// This components provides a context to share the value across the different components in the application
export function StopsProvider({ children }) {
    const storageStops = storageUtils.getStops()
    const [value, setStops] = useState(storageStops);

// Fetch the data for the lines or for the value
    useEffect(()=>{
        console.log(storageStops,1);
        console.log(value,1);
        if(!value || !value.data){
            let startTime = performance.now()
            let getStops = async () => {
                const temp = await reqAllStops()
                var endTime = performance.now()
                console.log('Time taken: ' + (endTime-startTime))

                setStops(temp)
            };


            getStops()
            // console.log(storageStops,2);
            // console.log(value,2);
        }else{
            setStops(storageStops)
            // console.log(storageStops,3);
            // console.log(value,3);
        }
    },[])
   

    if(value!=null){
        storageUtils.saveStops(value)
        return <StopsContext.Provider value={value}>{children}</StopsContext.Provider>;
    }else{
        return <StopsContext.Provider value={"Loading..."}>{children}</StopsContext.Provider>;
    }
   

}