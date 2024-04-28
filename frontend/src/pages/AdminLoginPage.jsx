import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        admin_username: "",
        admin_password: "",
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
            const response = await axios.post("http://localhost:4000/admin", {
                admin_username: formData.admin_username,
                admin_password: formData.admin_password,
            });
            console.log(response);
            navigate('/AdminDashboardPage');
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-96 p-6 flex flex-col items-center justify-center shadow-lg bg-orange-500 rounded-md">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
                    Admin Sign in
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 w-full">
                    <div className="mb-6 w-full">
                        <label htmlFor="admin_username" className="block text-sm font-bold leading-6 text-gray-900">Username</label>
                        <input onChange={handleChange} id="admin_username" name="admin_username" type="text" autoComplete="username"
                               value={formData.admin_username} required
                               placeholder=" Enter your username"
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="admin_password" className="block text-sm font-bold leading-6 text-gray-900">Password</label>
                        <input onChange={handleChange} id="admin_password" name="admin_password" type="password"
                               autoComplete="current-password" value={formData.admin_password} required
                               placeholder=" Enter your password"
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>

                    <div className="w-full">
                        <button type="submit"
                                className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
