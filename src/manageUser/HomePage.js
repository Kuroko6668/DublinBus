import { useContext } from "react";
// import UserProfile from "../Components/UserProfile/index.jsx";
import AuthContext from "../context/AuthContext";
import Logout from "./Logout.js";



const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <section>

      {/* {user && <UserProfile user={user} />} */}
      <h1>You are on home page!</h1>
      <Logout/>


    </section>
  );
};

export default Home;