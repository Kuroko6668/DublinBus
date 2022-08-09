
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    
      <div>           
        <button onClick={logoutUser}>Logout</button> 
      </div>
      
  );
};

export default Logout;