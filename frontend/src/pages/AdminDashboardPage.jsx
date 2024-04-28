import React, { useState } from 'react';

const AdminDashboard = () => {
    const [userId, setUserId] = useState('');
    const [postId, setPostId] = useState('');

    const handleBanUser = () => {
        // Code to ban user with userId
        console.log(`User with ID ${userId} has been banned.`);
    };

    const handleDeletePost = () => {
        // Code to delete post with postId
        console.log(`Post with ID ${postId} has been deleted.`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ban User</h2>
                <input
                    type="text"
                    placeholder="Enter User ID"
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleBanUser}
                >
                    Ban User
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Delete Post</h2>
                <input
                    type="text"
                    placeholder="Enter Post ID"
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleDeletePost}
                >
                    Delete Post
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
