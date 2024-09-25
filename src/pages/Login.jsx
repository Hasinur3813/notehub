import React, { useState, useContext } from "react";
import PageLayout from "../components/PageLayout";
import Form from "../components/Form";
import TextInput from "../components/TextInput";
import { Email } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hanldeLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (e) {
      setLoading(false);
      setError("Email or Password is incorrect!");
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen w-full">
        <Form onSubmit={hanldeLoginSubmit} text="Login to your account">
          <TextInput
            type="email"
            placeholder="Enter your Email"
            Icon={Email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            VisibilityIcon={
              !showPassword ? VisibilityOffOutlinedIcon : VisibilityIcon
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setShowPassword((prev) => !prev)}
          />

          {error && (
            <p className="transition duration-150 text-center bg-red-100 rounded px-2 py-2 text-base text-red-400">
              {error}
            </p>
          )}

          <Button
            type="submit"
            text={loading ? "logging in..." : "Log In"}
            className="w-full mt-4 bg-accent-1 hover:bg-accent-2 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-2 dark:bg-dark-secondary border border-accent-1 dark:hover:bg-dark-primary"
          />

          <div className="w-full rounded my-3 text-center">Or</div>
          <Button
            type="button"
            text="Sign in with Google"
            className="w-full py-2 bg-primary text-base dark:bg-dark-secondary hover:bg-gray-200 text-accent-1 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out dark:hover:bg-dark-primary dark:border dark:border-accent-1"
          />

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent-1 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </PageLayout>
  );
};

export default Login;
