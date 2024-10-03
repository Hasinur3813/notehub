import React, { useState, useContext } from "react";
import PageLayout from "../components/PageLayout";
import { Email, Person as PersonIcon } from "@mui/icons-material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import TextInput from "../components/TextInput";
import Form from "../components/Form";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      return setError("Password don't match!");
    }
    if (password.length < "6") {
      return setError("Password should be at least six characters in length");
    }

    try {
      setLoading(true);
      setError(null);
      await signup(userName, email, password);
      setLoading(false);

      navigate("/");
      console.log("login successful!");
    } catch (e) {
      setError("It seems the email is already in use!");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);

      await signInWithGoogle();
      setLoading(false);
    } catch (e) {
      setError(e.code);
      console.log(e.code);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center py-10 ">
        <div className="lg:w-1/2">
          <Form text="Create an account" onSubmit={handleSubmitForm}>
            {/* Name Input */}
            <TextInput
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              label="Your Name"
              id="name"
              type="text"
              placeholder="Enter your name"
              Icon={PersonIcon}
            />

            {/* Email Input */}
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email"
              Icon={Email}
            />

            {/* Password Input */}
            <TextInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              type={showPassword === true ? "text" : "password"}
              onClick={() => setShowPassword((prev) => !prev)}
              VisibilityIcon={
                showPassword ? VisibilityIcon : VisibilityOffOutlinedIcon
              }
              Icon=""
              placeholder="Enter password"
            />

            {/* confirm Password Input */}
            <TextInput
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              label="Confirm Password"
              id="ConfirmPassword"
              type={showConfirmPassword === true ? "text" : "password"}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              VisibilityIcon={
                showConfirmPassword ? VisibilityIcon : VisibilityOffOutlinedIcon
              }
              Icon=""
              placeholder="Confirm password"
            />

            {error && (
              <p className="transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
                {error}
              </p>
            )}

            <Button
              type="submit"
              text={loading ? "Signing up..." : "Sign Up"}
              className="w-full mt-4 bg-accent-1 hover:bg-accent-2 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-2 dark:bg-dark-secondary border border-accent-1 dark:hover:bg-dark-primary"
            />

            <div className="w-full rounded my-3 text-center">Or</div>

            {/* Sign in with Google */}
            <Button
              onClick={handleGoogleSignIn}
              type="button"
              text="Sign in with Google"
              className="w-full py-2 bg-primary text-base dark:bg-dark-secondary hover:bg-gray-200 text-accent-1 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out dark:hover:bg-dark-primary dark:border dark:border-accent-1"
            />

            {/* Already have an account? */}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-accent-1 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup;
