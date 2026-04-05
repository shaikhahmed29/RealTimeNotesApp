import { useState } from "react";
import axios from "axios";

const API = "https://realtimenotesapp-jrke.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(API + "/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      window.location = "/notes";
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;