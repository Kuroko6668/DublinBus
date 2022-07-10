import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserStatsPage from './Components/UserStatsPage';
import UserProfilePage from './Components/UserProfile';
import LoginPage from './views/LoginPage'
import HomePage from './views/HomePage'
import SignIn from './views/SignIn';
// import Register from './views/Register'
import SignUp from './views/SignUp';
import { AuthProvider } from "./context/AuthContext";


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Planner from './Components/Planner/Index';
import ProtectedPage from './views/ProtectedPage';
// import SignIn from './views/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter> 
    {/* mike */}
    <AuthProvider>

    <Routes>

      <Route>
      <Route element = {<Planner/>}/>
      <Route path = "/ProtectedPage" element = {<ProtectedPage/>}/>

      <Route path="/" element={<App />} />
      <Route path="userStatsPage" element={<UserStatsPage />} />
      <Route path="SignUp" element={<SignUp />} />

      <Route path="HomePage" element={<HomePage />} />
      <Route path="Signin" element={<SignIn />} />


      </Route>

    </Routes>

    {/* Mike */}
    </AuthProvider>

    </BrowserRouter>


   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
