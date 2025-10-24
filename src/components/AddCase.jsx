import React, { useState } from "react";
import axios from "axios";
import "./AddCase.css";

const AddCase = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) return alert("Please login first!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    if (image) formData.append("file", image);

    setLoading(true);

    try {
      const response = await axios.post(
        `https://civicconnect-backend-cn1d.onrender.com/api/case/add?userId=${user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Case added successfully!");
      console.log("Added Case:", response.data);

      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);
    } catch (err) {
      console.error("Error adding case:", err.response || err);
      alert("❌ Failed to add case. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addcase-container">
      <h2>Add Case</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Case"}
        </button>
      </form>
    </div>
  );
};

export default AddCase;
