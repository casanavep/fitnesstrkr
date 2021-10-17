import "./App.css";

import { useEffect, useState } from "react";
import { Route } from "react-router";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Activities from "./components/Activities";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const resp = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const info = await resp.json();
      setUser(info);
    };
    fetchUser();
  }, [token]);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  });

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/routines">
        <Routines token={token} user={user} />
      </Route>
      <Route path="/my-routines">
        <MyRoutines token={token} user={user} />
      </Route>
      <Route path="/activities">
        <Activities token={token} user={user} />
      </Route>
      <Route path="/login">
        <Login setToken={setToken} setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register user={user} setToken={setToken} setUser={setUser} />
      </Route>
    </>
  );
}

export default App;
