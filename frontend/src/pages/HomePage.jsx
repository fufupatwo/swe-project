import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    userEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected image file

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/home");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update selected file state when file input changes
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("itemtitle", formData.title);
      formDataWithImage.append("itemdescription", formData.description);
      formDataWithImage.append("itemprice", formData.amount);
      formDataWithImage.append("useremail", formData.userEmail);
      formDataWithImage.append("photo", selectedFile); // Append the selected image file to the form data

      const response = await axios.post("http://localhost:4000/post_creation", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });

      console.log(response.data);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const renderImage = (photo) => {
  if (!photo || !photo.data) return <div>Image not available</div>;
  const base64Image = arrayBufferToBase64(photo.data);
  return (
    <img
      src={`data:image/jpeg;base64,${base64Image}`}
      alt="Item"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "cover", // Ensure the image covers its container
      }}
    />
  );
};


  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
      <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-300">Recent Posts</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {posts.slice().reverse().map((post) => (
            <Link to={`/post/${post.item_id}`} key={post.item_id} className="group relative rounded-md overflow-hidden bg-gray-200">
              <div className="aspect-w-1 aspect-h-1">
                {renderImage(post.photo)}
              </div>
              <div className="p-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{post.itemtitle}</h3>
                  <p className="mt-1 text-sm text-gray-500">{post.itemdescription}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${post.itemprice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModal}
              style={{position: "absolute", top: "20px", right: "150px"}}// Adjusted margin-right for spacing
          >
            Create a Post!
          </button>
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                console.log("Logged out");
                window.location.href = "/";
              }}
              style={{position: "absolute", top: "20px", right: "20px"}}
          >
            Log Out
          </button>
        </div>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
              <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p className="font-semibold text-gray-800">
                  Insert Information to create a post!
                </p>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col px-6 py-5 bg-gray-50">
                <div className="mb-2 font-semibold text-gray-700">
                  Post Title:
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title..."
                  className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.title && "border-red-500"}`}
                  required
                />
                {errors.title && (
                  <span className="text-sm text-red-600">Title is required</span>
                )}
                <div className="mb-2 font-semibold text-gray-700">
                  Item Description:
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Type message..."
                  className={`p-5 bg-white border border-gray-200 rounded shadow-sm h-36 mb-5 text-gray-800 ${errors.description && "border-red-500"}`}
                  required
                />
                {errors.description && (
                  <span className="text-sm text-red-600">
                    Description is required
                  </span>
                )}
                <div className="mb-2 font-semibold text-gray-700">Amount:</div>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  placeholder="Enter amount..."
                  className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.amount && "border-red-500"}`}
                  required
                />
                {errors.amount && (
                  <span className="text-sm text-red-600">Amount is required</span>
                )}

                <div className="mb-2 font-semibold text-gray-700">Upload Image:</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-5"
                />
                <div className="mb-2 font-semibold text-gray-700">
                  Email to contact seller:
                </div>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${errors.userEmail && "border-red-500"}`}
                  required
                />
                {errors.userEmail && (
                  <span className="text-sm text-red-600">Email is required</span>
                )}
                {/* Image input and display removed */}
              </div>
              <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <p className="font-semibold text-gray-600" onClick={closeModal}>
                  Cancel
                </p>
                <button
                  className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
