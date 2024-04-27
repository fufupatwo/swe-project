import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        securityQuestion: ''
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
            const response = await axios.post("http://localhost:4000/forgot_password_page", {
                email: formData.email,
                securityQuestion: formData.securityQuestion
            });
            console.log(response)
            // Redirect or show a success message here
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?

                        </p>
                        <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                            Login here
                        </a>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            placeholder="Enter your email address"
                                            required
                                            aria-describedby="email-error"
                                            style={{color: 'black'}} // Apply inline style to set text color to black
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="securityQuestion"
                                           className="block text-sm font-bold ml-1 mb-2 dark:text-white">Security
                                        Question</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="securityQuestion"
                                            name="securityQuestion"
                                            value={formData.securityQuestion}
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            placeholder="What city were you born in?"
                                            required
                                            aria-describedby="security-question-error"
                                            style={{color: 'black'}} // Apply inline style to set text color to black
                                        />

                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Reset password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </main>
    );
}
