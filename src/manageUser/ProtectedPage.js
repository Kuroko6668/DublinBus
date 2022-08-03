import { useContext } from "react";

import { useEffect, useState, useMemo } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";





function ProtectedPage() {
  const { user } = useContext(AuthContext);
  console.log(user)

  const state = { 
    id : user.user_id,
    favourite_stop_1: '1', 
    favourite_stop_2: '1', 
    favourite_stop_3: '1'}

  const [res, setRes] = useState("");
  const api = useAxios();
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/userdata/" + state.id);
        console.log(response)
        //console.log(response)
        
        api.put("/userdata/" + state.id, state )

        //setRes(response.data.response);
        // const response = await api.get("/userdata/1");

        //console.log(response)
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Projected Page</h1>
      {/* <p>{res}</p> */}
    </div>
  );
}

export default ProtectedPage;