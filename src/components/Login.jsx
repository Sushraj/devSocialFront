import axios from "axios";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmaild] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Login failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">
              {isLoginForm ? "Login" : "Sign Up"}
            </legend>

            {!isLoginForm && (
              <>
                <label className="label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              value={emailId}
              className="input"
              onChange={(e) => setEmaild(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500">{errorMessage}</p>
            <button
              className="btn btn-neutral mt-4"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <p
              className="mt-4 text-center cursor-pointer text-sm text-blue-500"
              onClick={() => setIsLoginForm((prev) => !prev)}
            >
              {isLoginForm
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
