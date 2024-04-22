import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        userEmail: ''
    });
    const [errors, setErrors] = useState({});

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/post_creation", {
                itemtitle: formData.title,
                itemdescription: formData.description,
                itemprice: formData.amount,
                useremail: formData.userEmail
            });
            console.log(response.data);
            closeModal();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                    Create a Post!
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
                        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                            <p className="font-semibold text-gray-800">Insert Information to create a post!</p>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col px-6 py-5 bg-gray-50">
                            <div className="mb-2 font-semibold text-gray-700">Post Title:</div>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter title..."
                                className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.title && 'border-red-500'}`}
                                required
                            />
                            {errors.title && <span className="text-sm text-red-600">Title is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Item Description:</div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Type message..."
                                className={`p-5 bg-white border border-gray-200 rounded shadow-sm h-36 mb-5 text-gray-800 ${errors.description && 'border-red-500'}`}
                                required
                            />
                            {errors.description && <span className="text-sm text-red-600">Description is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Amount:</div>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount..."
                                className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.amount && 'border-red-500'}`}
                                required
                            />
                            {errors.amount && <span className="text-sm text-red-600">Amount is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Email to contact seller:</div>
                            <input
                                type="email"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleChange}
                                placeholder="Enter your email..."
                                className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.userEmail && 'border-red-500'}`}
                                required
                            />
                            {errors.userEmail && <span className="text-sm text-red-600">Email is required</span>}
                            {/* Image input and display removed */}
                        </div>
                        <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                            <p className="font-semibold text-gray-600" onClick={closeModal}>Cancel</p>
                            <button className="px-4 py-2 text-white font-semibold bg-blue-500 rounded" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
