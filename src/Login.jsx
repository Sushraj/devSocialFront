import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmaild] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:7777/login", {
        emailId: emailId,
        password: password,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              value={emailId}
              className="input"
              placeholder="Email"
              onChange={(e) => setEmaild(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-neutral mt-4" onClick={handleLogin}>
              Login
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
