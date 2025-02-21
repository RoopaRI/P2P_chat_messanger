import React, { useState } from "react";
import { signup } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Logo from '../../assets/logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "" });

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;  // Accepts exactly 10 digits

  // Handle input changes and validate fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";

    if (name === "name" && !nameRegex.test(value)) {
      errorMessage = "Name should only contain alphabets and spaces.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Enter a valid email address.";
    } else if (name === "mobile" && !phoneRegex.test(value)) {
      errorMessage = "Phone number should be 10 digits.";
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if there are any validation errors before submitting
    if (errors.name || errors.email || errors.mobile) {
      toast.error("Please fix validation errors before submitting.", { position: "top-right" });
      return;
    }
  
    try {
      const response = await signup(formData);
      toast.success("Signup successful!", { position: "top-right" });
  
      console.log("User added:", response);
  
      // ✅ Reset form fields after successful signup
      setFormData({ name: "", email: "", mobile: "" });
      setErrors({ name: "", email: "", mobile: "" }); // Reset error messages as well
  
    } catch (error) {
      if (error.message.includes("already exists")) {
        toast.error("Email or Mobile number already registered.", { position: "top-right" });
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
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input type="text" name="mobile" placeholder="Phone Number" value={formData.mobile} onChange={handleChange} required />
          {errors.mobile && <p className="error-text">{errors.mobile}</p>}

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
