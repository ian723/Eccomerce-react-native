import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (Email, password) => {
    try {
      console.log("Attempting to login with:", Email, password);
      const response = await axios.post(
        "http://localhost:8000/api/v1/customer/login",
        { Email, password }
      );
      console.log("Login response:", response.data.user);
      setUser(response.data); // Assuming response structure { user: {...} }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response ? error.response.data.message : "Invalid credentials"
      );
    }
  };

  const signup = async (first_name, last_name, Email, password) => {
    try {
      console.log(
        "Attempting to sign up with:",
        first_name,
        last_name,
        Email,
        password
      );
      const response = await axios.post(
        "http://localhost:8000/api/v1/customer/register",
        { first_name, last_name, Email, password }
      );
      console.log("Signup response:", response.data);
      setUser(response.data.user); // Assuming response structure { user: {...} }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response ? error.response.data.message : "Credentials already taken"
      );
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
