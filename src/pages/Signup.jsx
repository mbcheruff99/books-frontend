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
      await api.post("/users", { name, email, password, password_confirmation: passwordConfirmation });
      
      // Log the user in after successful signup
      const res = await api.post("/sessions", { email, password });
      
      const userData = {
        id: res.data.user_id,
        email: res.data.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Signup failed" + (err.response?.data?.message || err.message));
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
