import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { AddRoom } from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms.jsx";

function App() {
  return (
    <>
      <AddRoom />
      <ExistingRooms />
    </>
  );
}

export default App;
