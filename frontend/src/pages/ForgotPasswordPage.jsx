import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    useremail: "",
    security: "",
    password: "",
    confirmPassword: "",
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
      const response = await axios.post(
          "http://localhost:4000/forgot_password",
          {
            useremail: formData.useremail,
            security: formData.security,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          },
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Sending you to password reset page");
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-utsablue">
        <div className="w-96 p-6 flex flex-col items-center justify-center shadow-lg bg-orange-500 rounded-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-black">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 w-full">
            <div className="mb-6 w-full">
              <label
                  htmlFor="useremail"
                  className="block text-sm font-medium leading-6 text-black"
              >
                Email
              </label>
              <input
                  onChange={handleChange}
                  id="useremail"
                  name="useremail"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder=" Enter your email!"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mb-6 w-full">
              <label
                  htmlFor="security"
                  className="block text-sm font-medium leading-6 text-black"
              >
                Security Question Answer
              </label>
              <input
                  onChange={handleChange}
                  id="security"
                  name="security"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder=" What city were you born in?"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mb-6 w-full">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black"
              >
                New Password
              </label>
              <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder=" Enter your new password!"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mb-6 w-full">
              <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-black"
              >
                Confirm New Password
              </label>
              <input
                  onChange={handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder=" Confirm your new password!"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="w-full">
              <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
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
        </div>
      </div>
  );
}
