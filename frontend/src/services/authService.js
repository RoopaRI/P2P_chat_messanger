import axios from "axios";
import API_BASE_URL from "../config";

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
