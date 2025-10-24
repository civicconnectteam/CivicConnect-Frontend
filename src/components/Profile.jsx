import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ user }) => {
  const [cases, setCases] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ show: false, caseId: null });

  useEffect(() => {
    if (user?.id) fetchCases();
  }, [user]);

  const fetchCases = () => {
    axios
      .get(`http://localhost:8082/api/case/user/${user.id}`)
      .then(res => setCases(res.data))
      .catch(() => {});
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8082/api/case/delete/${id}`)
      .then(() => {
        setCases(cases.filter(c => c.id !== id));
        setToast("Case successfully deleted");
        setTimeout(() => setToast(""), 1000);
      })
      .catch(() => {});

    setConfirmDelete({ show: false, caseId: null });
  };

  if (!user) return <h3>Please login to view your profile.</h3>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Cases Registered by Me</h3>
      {cases.length === 0 ? (
        <p>No cases registered yet.</p>
      ) : (
        <ul className="case-list">
          {cases.map(c => (
            <li key={c.id} className="case-item">
              <p><strong>Case Title:</strong> {c.title}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Status:</strong> <span className="status">{c.status}</span></p>

              {c.adminReview && (
                <p className="admin-review"><strong>Admin Review:</strong> {c.adminReview}</p>
              )}

              {c.imageUrl && (
                <p>
                  <strong>Image:</strong>{" "}
                  <span className="case-image-text" onClick={() => setPopupImage(c.imageUrl)}>
                    View Image
                  </span>
                </p>
              )}

              <button className="delete-btn" onClick={() => setConfirmDelete({ show: true, caseId: c.id })}>
                Delete Case
              </button>
            </li>
          ))}
        </ul>
      )}

      {popupImage && (
        <div className="popup-overlay" onClick={() => setPopupImage(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <img src={popupImage} alt="popup" />
            <button className="close-btn" onClick={() => setPopupImage(null)}>×</button>
          </div>
        </div>
      )}

      {confirmDelete.show && (
        <div className="confirm-overlay">
          <div className="confirm-content">
            <p>Are you sure you want to delete this case?</p>
            <div>
              <button className="yes-btn" onClick={() => handleDelete(confirmDelete.caseId)}>Yes</button>
              <button className="no-btn" onClick={() => setConfirmDelete({ show: false, caseId: null })}>No</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
};

export default Profile;
