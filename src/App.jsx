import { Routes, Route } from "react-router-dom";

import AddTask from "./components/AddTask";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home"; // optional

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;
