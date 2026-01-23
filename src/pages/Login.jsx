import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sessions", { email, password });
      navigate("/"); // redirect after login
    } catch (err) {
      console.log(err);
      alert("Login failed" + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto">
      <h2>Login</h2>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
}
