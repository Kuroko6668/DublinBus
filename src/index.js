import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import SignIn from './manageUser/SignIn';
import SignUp from './manageUser/SignUp';
import { AuthProvider } from "./context/AuthContext";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Planner from './Components/Planner/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter> 
    {/* wrap app in AuthProvider */}
    <AuthProvider>

    <Routes>

      <Route>
      <Route element = {<Planner/>}/>
      <Route path="/" element={<App />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="SignIn" element={<SignIn />} />
      </Route>

    </Routes>

    </AuthProvider>

    </BrowserRouter>


   
  </React.StrictMode>
);

reportWebVitals();
