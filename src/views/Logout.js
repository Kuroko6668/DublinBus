import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <h1>App Name</h1>
        <div>


          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/protected">Protected Page</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <h1>User logged in</h1>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Logout;