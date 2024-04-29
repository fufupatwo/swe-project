import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", formData);
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.error("You are banned. Please contact support.", error);
      // Check if the error message indicates user is banned
      if (
        error.response &&
        error.response.data.error === "You are banned. Please contact support."
      ) {
        setErrorMessage("You are banned. Please contact support.");
      } else {
        setErrorMessage("You are banned. Please contact support.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-utsablue">
      <div className="w-96 p-6 flex flex-col items-center justify-center shadow-lg bg-orange-500 rounded-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
          Sign in
        </h2>
        {errorMessage && ( // Display error message if exists
          <p className="text-red-900 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 w-full">
          <div className="mb-6 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              id="useremail"
              name="useremail"
              type="email"
              autoComplete="email"
              value={formData.useremail}
              required
              placeholder=" Enter your email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="password"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              required
              placeholder="Enter your password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/CreateAccount"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create Account
          </a>
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          {" "}
          <a
            href="/ForgotPasswordPage"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}
