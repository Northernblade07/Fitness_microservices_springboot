import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Button } from "@mui/material";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import ActivityDetails from "./components/ActivityDetails";

const App = () => {

  const { token, tokenData} = useContext(AuthContext);
  const dispatch = useDispatch(); 
const [authReady, setAuthReady] = useState(false);

  useEffect(() => {

    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
      setAuthReady(true);


  }, [token, tokenData, dispatch]);

  if (!authReady) return ;

  return (

    <BrowserRouter>
          <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


          <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />

         <Route
          path="/activities/:id"
          element={
            <ProtectedRoute>
              <ActivityDetails />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
};

export default App;