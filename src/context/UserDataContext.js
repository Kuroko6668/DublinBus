import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import myAxios from "../ajax/myAxios";

import AuthContext from "./AuthContext";
import { get } from "store";


const UserDataContext = createContext();

export default UserDataContext;

export const UserDataProvider = ({ children }) => {

  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    id:  '0',
    favourite_stop_1: "0",
    favourite_stop_2: "0",
    favourite_stop_3: "0",

  });



  const [stopNames, setStopNames] = useState({
    favourite_stop_1_name: "",
    favourite_stop_2_name: "",
    favourite_stop_3_name: "",
  })

  // const [stop1Name, setStop1Name] = useState('');
  
  const api = useAxios();
  
  const getUserData = async() => {
    console.log('context ')
    console.log(userData)
    try {  

    const response = await api.get("/userdata/" + user.user_id)
      setUserData(response.data);
      getStopNames(response.data);
    


    } catch (error) {
      console.error(error);
    }
  }



  


  const getStopNames = async(userData) => {
    console.log(userData)
    let stop_names;
    stop_names = await myAxios.get("/stopname/"+userData[0].favourite_stop_1+"/"+userData[0].favourite_stop_2+"/"+userData[0].favourite_stop_3).then(
      console.log(stop_names)
    )
    console.log(stop_names.data)
    let stop1 = '';
    let stop2 = '';
    let stop3 = '';

    if(userData[0].favourite_stop_1 !== '0') {
      let stopNameIndex = 0;
      for(let i=0; i<3; i++) {
        if(stop_names.data[i].stop_id === userData[0].favourite_stop_1 ) {
          stopNameIndex = i;
          break;
        }
      }
      stop1 = stop_names.data[stopNameIndex].stop_name;
      console.log(stop1)
      // setStopNames({...stopNames, favourite_stop_1_name: stopName})
      // setStopNames({
      //   favourite_stop_1_name: stopName,
      //   favourite_stop_2_name: 'TEST',
      //   favourite_stop_3_name: 'TEST 3',
      // })
      // setStop1Name('test');
      // setStop1Name((stop1Name, props) => {return 'TESTTTT'}) 
   
    }
    if(userData[0].favourite_stop_2 !== '0') {
      let stopNameIndex = 0;
      for(let i=0; i<3; i++) {
        if(stop_names.data[i].stop_id === userData[0].favourite_stop_2 ) {
          stopNameIndex = i;
          break;
        }
      }
      stop2 = stop_names.data[stopNameIndex].stop_name;
      // setStopNames({
      //   favourite_stop_1_name: stopName,
      //   favourite_stop_2_name: 'TEST',
      //   favourite_stop_3_name: 'TEST 3',
      // })
      // setStopNames({...stopNames, favourite_stop_2_name: 'ALICE '})

    }
    if(userData[0].favourite_stop_3 !== '0') {
      let stopNameIndex = 0;
      for(let i=0; i<3; i++) {
        if(stop_names.data[i].stop_id === userData[0].favourite_stop_3 ) {
          stopNameIndex = i;
          break;
        }
      }
      stop3= stop_names.data[stopNameIndex].stop_name;
      // setStopNames({favourite_stop_1_name: 'TEST'});
      // setStopNames({...stopNames, favourite_stop_3_name: stopName})
   
    }


    // setStopNames({
    //   favourite_stop_1_name: stop1, 
    //   favourite_stop_2_name: stop2, 
    //   favourite_stop_3_name: stop3
    // }, function () {
    //   console.log("TESTTTSTTS")
    // })

  //   this.setState({value: event.target.value}, function () {
  //     console.log(this.state.value);
  // });
  addStopNames(stop1,stop2,stop3)
  }

  const addStopNames = (stop1,stop2,stop3) =>{
    setStopNames({
      favourite_stop_1_name: stop1, 
      favourite_stop_2_name: stop2, 
      favourite_stop_3_name: stop3
    })
    console.log(stopNames)
  }



  const removeFavourite = (stop_id) => {
      console.log("Near me remove " + stop_id);
      console.log("Clicked remove favourite");
      console.log(stop_id)
      let newState = userData[0];
      if (
        Object.keys(userData[0]).find(
          (key) => userData[0][key] === stop_id
        )
      ) {
        console.log("exists in favourites");
        const numberInFavourites = Object.keys(userData[0]).find(
          (key) => userData[0][key] === stop_id
        );
        if (numberInFavourites) {
          console.log('Found index')
          newState[numberInFavourites] = "0";
        }
      } else {
        console.log("not in fav");
      }
      setUserData({ ...userData, 0: newState });
      console.log('new state')
      console.log(userData)
      console.log(newState)
      api.put("/userdata/" + user.user_id, newState).then(() => getStopNames(userData));
    }

  const addFavourite=(stop_id) => {
    console.log("Add fav in context ");
    console.log(stop_id);
    //     console.log("ADD TO FAV");

    let newState = userData[0];
    console.log(newState);

    if (
      !Object.keys(userData[0]).find(
        (key) => userData[0][key] === stop_id
      )
    ) {
      console.log("doesnt exist in favourites");

      const availableFavourite = Object.keys(userData[0]).find(
        (key) => userData[0][key] === "0"
      );
      if (availableFavourite) {
        newState[availableFavourite] = stop_id;
      } else {
        console.log("have 3 favourites");
      }
    } else {
      console.log("already in fav");
    }
    setUserData({ ...userData, 0: newState });
    api.put("/userdata/" + user.user_id, newState).then(() => getStopNames(userData));
  
  }
  const contextData = {
    userData,
    setUserData,
    addFavourite,
    removeFavourite,
    stopNames,
    
  };

  useEffect(() => {

          getUserData()
          
          
  }, [user]);

  return (
    <UserDataContext.Provider value={contextData}>
       {children}
    </UserDataContext.Provider>
  );
};