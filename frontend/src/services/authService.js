import axios from "axios";
import API_BASE_URL from "../config";

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);

    if (!response.data || !response.data.user) {
      throw new Error("Invalid response from server");
    }

    return response.data;  // ✅ Ensure user data is returned
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
