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
    <div>
       <div className="aspect-w-1 aspect-h-1">
                {renderImage(post.photo)}
              </div>
      <h2>{post.itemtitle}</h2>
      <p>{post.itemdescription}</p>
      <p>${post.itemprice}</p>
      
    </div>
  );
};

export default PostDetailPage;
