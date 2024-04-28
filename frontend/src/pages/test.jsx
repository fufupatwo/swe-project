import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [posts, setPosts] = useState([]);

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

  const renderImage = (photo) => {
    if (!photo || !photo.data) return <div>Image not available</div>;
    const base64Image = arrayBufferToBase64(photo.data);
    return <img src={`data:image/jpeg;base64,${base64Image}`} alt="Item" style={{ maxWidth: "200px" }} />;
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
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {posts.map((post, index) => (
        <div key={index} style={{ flex: "0 0 calc(33.33% - 20px)", margin: "10px" }}>
          {renderImage(post.photo)}
          <h2>{post.itemtitle}</h2>
          <p>{post.itemdescription}</p>
          <p>${post.itemprice}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
