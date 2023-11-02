import "./App.css";
import Header from "./header/header";
import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import RoomList from "./rooms/roomList";
import { Grid } from "@mui/material";
import Room from "./rooms/room";
import { UserProvider } from "./auth/UserContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/room/:roomId/:roomName" element={<Room />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
