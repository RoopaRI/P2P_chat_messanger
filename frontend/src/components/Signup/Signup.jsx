import React, { useState } from "react";
import { signup } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Logo from '../../assets/logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      toast.success("Signup successful!", { position: "top-right" });  // ✅ Success toast
      console.log("User added:", response);
    } catch (error) {
      if (error.message.includes("already exists")) {
        toast.error("Email or Mobile number already registered.", { position: "top-right" });  // ❌ Error toast
      } else {
        toast.error("Signup failed. Please try again.", { position: "top-right" });
      }
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div>
        <img src={Logo} alt="Logo" className="signup-logo" />
      </div>
      <div className="signup-box">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Phone Number" onChange={handleChange} required />
        <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
