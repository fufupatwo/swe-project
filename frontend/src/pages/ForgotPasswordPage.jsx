import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        useremail: "",
        securityQuestionAnswer: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/forgot_password", formData);
            console.log(res);
            navigate('/');
        } catch (error) {
            console.error("An error occurred:", error);
        }

        setFormData({
            useremail: "",
            securityQuestionAnswer: "",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-96 p-6 flex flex-col items-center justify-center shadow-lg bg-orange-500 rounded-md">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
                    Forgot Password
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 w-full">
                    <div className="mb-6 w-full">
                        <label htmlFor="useremail" className="block text-sm font-medium leading-6 text-gray-50">Email</label>
                        <input
                            onChange={handleChange}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder=" Enter your email!"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="securityQuestionAnswer" className="block text-sm font-medium leading-6 text-gray-50">Security Question Answer</label>
                        <input
                            onChange={handleChange}
                            id="securityQuestion"
                            name="securityQuestion"
                            type="text"
                            autoComplete="off"
                            required
                            placeholder=" What city were you born in?"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />                    </div>

                    <div className="w-full">
                        <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/CreateAccount" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create Account</a>
                </p>
            </div>
        </div>
    );
}
