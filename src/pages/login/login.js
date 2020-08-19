import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dots } from "react-activity";
import io from "socket.io-client";
import "react-activity/dist/react-activity.css";

import "./login.css";

const socket = io.connect("http://localhost:8000");

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState({ accessToken: "", refreshToken: "" });
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8000/login", request)
      .then((res) => {
        // If login success, server will response with access token and refresh token
        const { data, status } = res;
        setToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        setIsloading(true);
        // Then user will join a specific room to real time communicate with server
        // User has to waiting for server to send USER_GRANTED event
        socket.emit("join_room", { room: username });
      })
      .catch((err) => {
        // If log in failed
        // Do something here
      });
  };

  const requestNewToken = () => {
    // Embedded an old refresh token in body to send a request
    axios
      .post("http://localhost:8000/newToken", {
        token: `Bearer ${token.refreshToken}`,
      })
      .then((res) => {
        // If old refresh token's working properly
        // Server will response with new access token and refresh token
        setToken({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
      })
      .catch((err) => {
        // If old refresh token's expired
        // Force log out to make user log in again to receive a new access token
      });
  };

  const sendMOCKrequest = () => {
    // Embedded access token in Authorization header to send a request
    axios
      .get("http://localhost:8000/checktoken", {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      })
      .then((res) => {
        // If access token's working properly
        // Do something with response from server
      })
      .catch((err) => {
        // If access token's expired
        // Send request to ask for new access token and new refresh token from server 
        // by using old refresh token that's still working 
        requestNewToken();
      });
  };

  useEffect(() => {
    // Add socket event listener to observe for USER_GRANTED event from server
    // If server received a request from HARDWARE and the server process is success
    // Server will fire USER_GRANTED event and send information to user
    // If access's granted user will successfully login
    // then navigate to another page
    socket.on("USER_GRANTED", ({ message, granted, room }) => {
      console.log(message, granted, room);
      setIsloading(!granted);
    });
    // Remove socket event listener when unmounted
    return () => {
      socket.off("USER_GRANTED");
    };
  }, []);
  return (
    <div className="form">
      <div className="header">
        <label>LOG IN</label>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      <button onClick={() => sendMOCKrequest()}>send MOCK req</button>
      {isLoading && <Dots />}
    </div>
  );
}

export default Login;
