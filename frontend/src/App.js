import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard"; 
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App-header">
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/chat" element={<Dashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
