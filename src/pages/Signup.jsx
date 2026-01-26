import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the user account
      await api.post("/users", { name, email, password, password_confirmation: passwordConfirmation });
      
      // Log the user in after successful signup (exactly like Login component)
      try {
        const res = await api.post("/sessions", { email, password });
        
        console.log("Login response status:", res.status);
        console.log("Login response data:", res.data);
        
        // Verify we got a valid response (status 201 means created/success)
        if (res.status !== 201 || !res.data || !res.data.user_id) {
          console.error("Invalid login response:", res);
          alert("Account created but login response was invalid. Status: " + res.status + ", Response: " + JSON.stringify(res.data));
          return;
        }

        const userData = {
          id: res.data.user_id,
          email: res.data.email,
        };

        console.log("Setting user data:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
        // Verify it was set
        const verify = localStorage.getItem("user");
        console.log("Verified localStorage:", verify);
        
        // Navigate to books page (which uses user prop)
        navigate("/books");
      } catch (loginErr) {
        console.error("Login error after signup:", loginErr);
        console.error("Login error response:", loginErr.response?.data);
        console.error("Login error status:", loginErr.response?.status);
        console.error("Login error message:", loginErr.message);
        alert("Account created successfully, but automatic login failed. Error: " + (loginErr.response?.data?.message || loginErr.message) + ". Please try logging in manually.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.status === 422) {
        // Signup validation errors
        const errors = err.response?.data?.errors || [];
        alert("Signup failed: " + (errors.join(", ") || err.response?.data?.message || err.message));
      } else {
        alert("Signup failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto">
      <h2>Signup</h2>
      <div className="mb-3">
        <label>User Name</label>
        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password Confirmation</label>
        <input type="password" className="form-control" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
      </div>
      <button className="btn btn-primary">Signup</button>
    </form>
  );
}
