import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CaseStatus.css";

const CaseStatus = () => {
  const [cases, setCases] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [reviewText, setReviewText] = useState({});

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = () => {
    axios
      .get("https://civicconnect-backend-cn1d.onrender.com/api/case/all")
      .then((res) => setCases(res.data))
      .catch((err) => console.error("Error fetching cases:", err));
  };

  const updateStatus = (id, newStatus) => {
    axios
      .put(`https://civicconnect-backend-cn1d.onrender.com/api/case/updateStatus/${id}`, newStatus, {
        headers: { "Content-Type": "text/plain" },
      })
      .then(() => {
        setCases(
          cases.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  const deleteCase = (id) => {
    if (!window.confirm("Are you sure you want to delete this case?")) return;
    axios
      .delete(`https://civicconnect-backend-cn1d.onrender.com/api/case/delete/${id}`)
      .then(() => setCases(cases.filter((c) => c.id !== id)))
      .catch((err) => console.error("Error deleting case:", err));
  };

  const addReview = (id) => {
    const review = reviewText[id];
    if (!review?.trim()) return;

    axios
      .post(`https://civicconnect-backend-cn1d.onrender.com/api/case/addReview/${id}`, { review })
      .then(() => {
        alert("Review added successfully");
        setReviewText({ ...reviewText, [id]: "" });
        fetchCases();
      })
      .catch((err) => console.error("Error adding review:", err));
  };

  return (
    <div className="admin-container">
      <h2>Cases Dashboard</h2>
      <div className="case-grid">
        {cases.map((c) => (
          <div key={c.id} className="case-card">
            <p><strong>Title:</strong> {c.title}</p>
            <p><strong>User:</strong> {c.user?.name}</p>
            <p><strong>Status:</strong> {c.status}</p>
            <p><strong>Location:</strong> {c.location || "N/A"}</p>

            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.title}
                className="case-image"
                onClick={() => setPopupImage(c.imageUrl)}
              />
            )}

            <select
              value={c.status}
              onChange={(e) => updateStatus(c.id, e.target.value)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>

            <div className="review-section">
              <textarea
                placeholder="Add a review..."
                value={reviewText[c.id] || ""}
                onChange={(e) =>
                  setReviewText({ ...reviewText, [c.id]: e.target.value })
                }
              />
              <button onClick={() => addReview(c.id)}>Submit Review</button>
            </div>

            <button className="delete-btn" onClick={() => deleteCase(c.id)}>
              Delete Case
            </button>
          </div>
        ))}
      </div>

      {popupImage && (
        <div className="popup-overlay" onClick={() => setPopupImage(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={popupImage} alt="popup" />
            <button className="close-btn" onClick={() => setPopupImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStatus;
