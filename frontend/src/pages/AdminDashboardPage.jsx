import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        useremail: "",
    });

    const handleBanUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/ban", {
                useremail: formData.useremail,
            });
            console.log(response);
            navigate('/admindashboardpage');
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ban User</h2>
                <input
                    type="text"
                    placeholder="Enter User Email"
                    className="border border-gray-300 rounded-md p-2 mr-2 text-black"
                    value={formData.useremail} // Use formData.useremail as value
                    onChange={(e) => setFormData({ ...formData, useremail: e.target.value })}
                />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleBanUser}
                >
                    Ban User
                </button>
            </div>
        </div>
    );
};
