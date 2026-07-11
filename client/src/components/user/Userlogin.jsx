import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const {
    axios,
    setUserToken,
    navigate
  } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // User authentication is completed through the user login endpoint.
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        }
      );

      if (data.success) {
        localStorage.setItem(
          "userToken",
          data.userToken
        );

        setUserToken(data.userToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = data.userToken;

        toast.success(
          data.message || "Login successful"
        );

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white border border-primary/30 shadow-xl rounded-xl p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          <span className="text-primary">
            User
          </span>{" "}
          Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to manage your blogs
        </p>

        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border-b-2 outline-none py-2"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            required
            placeholder="Enter your password..."
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border-b-2 outline-none py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md hover:opacity-90 transition cursor-pointer"
        >
          Login
        </button>

        <div className="mt-6 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <p className="mt-3">
            Admin?{" "}
            <Link
              to="/admin"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;