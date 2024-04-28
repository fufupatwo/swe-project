import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetailPage = () => {
  const { item_id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log("Item ID:", item_id); // Log itemid to console
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/post/${item_id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [item_id]);

  if (!post) return <div>Loading...</div>;
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
        <div className="flex items-center">
          <div className="w-1/3">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              {renderImage(post.photo)}
            </div>
          </div>
          <div className="w-2/3 px-8">
            <h2 className="text-3xl font-bold mb-4">{post.itemtitle}</h2>
            <p className="text-lg mb-4">{post.itemdescription}</p>
            <p className="text-xl font-bold mb-4">${post.itemprice}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      );
};

export default PostDetailPage;
