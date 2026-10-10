import { useEffect } from "react";
import { formatDate } from "../utils.js";

// Pop-up with the full details of one result.
// Closes when you click the dark background, the Close button, or press Esc.
export default function ImageModal({ item, onClose }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation: clicks inside the box should not close it */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
        <h2>{item.title}</h2>
        <p className="date">{formatDate(item.date)}</p>
        <p className="modal-text">{item.description || "No description available."}</p>
        <p className="date">NASA ID: {item.id}</p>
      </div>
    </div>
  );
}
