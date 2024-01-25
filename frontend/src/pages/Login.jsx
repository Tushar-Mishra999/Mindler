// Login.js

import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Auth.css"; // Import the styling

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response= await fetch("http://65.2.189.213:8000/api/auth/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
        })
    });
    const data = await response.json();
    if(response.status === 200){
        history("/home",{state: {email: email}});
    } else {
        alert(data.message);
    }
  };

 

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
        <span>
            New User?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
