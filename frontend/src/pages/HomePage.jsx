import React, { useState } from 'react';

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [images, setImages] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError(false);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setDescriptionError(false);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountError(false);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
        }));
        setImages([...images, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSave = () => {
        let error = false;

        if (!title) {
            setTitleError(true);
            error = true;
        }

        if (!description) {
            setDescriptionError(true);
            error = true;
        }

        if (!amount) {
            setAmountError(true);
            error = true;
        }

        if (error) return;

        // Proceed with saving data
        closeModal();
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
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Enter title..."
                                className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${titleError && 'border-red-500'}`}
                                required
                            />
                            {titleError && <span className="text-sm text-red-600">Title is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Item Description:</div>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Type message..."
                                className={`p-5 bg-white border border-gray-200 rounded shadow-sm h-36 mb-5 text-gray-800 ${descriptionError && 'border-red-500'}`}
                                required
                            />
                            {descriptionError && <span className="text-sm text-red-600">Description is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Amount:</div>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="Enter amount..."
                                className={`w-full p-5 bg-white border border-gray-200 rounded shadow-sm mb-5 text-gray-800 ${amountError && 'border-red-500'}`}
                                required
                            />
                            {amountError && <span className="text-sm text-red-600">Amount is required</span>}
                            <div className="mb-2 font-semibold text-gray-700">Image:</div>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="mb-5"
                            />
                            <div className="flex flex-wrap">
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-32 h-32 mr-2 mb-2">
                                        <img src={image.url} alt={image.name} className="w-32 h-32 object-cover rounded" />
                                        <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full p-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* More modal content */}
                            {/* Add your additional modal content here */}
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
