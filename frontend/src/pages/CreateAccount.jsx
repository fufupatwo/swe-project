import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    securityQuestion: "",
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
      const response = await axios.post("http://localhost:4000/register", {
        user_fname: formData.firstName,
        user_lname: formData.lastName,
        useremail: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        securityQuestion: formData.securityQuestion,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-6 py-12 lg:px-8 bg-utsablue">
      <div className="w-96 p-6 items-center justify-center shadow-lg bg-orange-500 rounded-md">
        <div className="sm:w-full items-center justify-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
            Register
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label
              htmlFor="firstName"
              className="block text-sm font-bold leading-6 text-black"
            >
              First Name
            </label>
            <input
              onChange={handleChange}
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder=" Enter your first name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="lastName"
              className="block text-sm font-bold leading-6 text-black"
            >
              Last Name
            </label>
            <input
              onChange={handleChange}
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder=" Enter your last name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-bold leading-6 text-black"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder=" Enter your email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-bold leading-6 text-black"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder=" Enter your password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-bold leading-6 text-black"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              placeholder=" Confirm your password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="securityQuestion"
              className="block text-sm font-bold leading-6 text-black"
            >
              Security Question
            </label>
            <input
              onChange={handleChange}
              id="securityQuestion"
              name="securityQuestion"
              type="text"
              autoComplete="off"
              required
              placeholder=" What city were you born in?"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
