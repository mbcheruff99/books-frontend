import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, userShelves, onAdded }) {
  const [selectedShelf, setSelectedShelf] = useState(userShelves[0]?.id || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function formatShelfName(name) {
    return name
    .split("_") // split snake_case
    .map(word => word[0].toUpperCase() + word.slice(1)) // capitalize each word
    .join(" ")
  }


  async function addToShelf() {
    if (!selectedShelf) return alert("Please select a shelf first!");
    setLoading(true);
    try {
      await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
      const shelf = userShelves.find(s => s.id === selectedShelf);
      alert(`Added "${book.title}" to ${shelf?.name}!`);
    if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add book to shelf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card h-100">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/books/${book.id}`)}
      >
        <img src={book.cover} className="card-img-top" alt={book.title} />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
        </div>
      </div>

      {/* Shelf selection and Add button stay outside clickable div */}
      <div className="card-body">
        <select
          className="form-select mb-2"
          value={selectedShelf || ""}
          onChange={e => setSelectedShelf(parseInt(e.target.value))}
        >
          {userShelves.map(shelf => (
            <option key={shelf.id} value={shelf.id}>
              {formatShelfName(shelf.name)}
            </option>
          ))}
        </select>

        <button
          className="btn btn-sm btn-success"
          onClick={addToShelf}
          disabled={loading || !selectedShelf}
        >
          {loading ? "Adding..." : "Add to Shelf"}
        </button>
      </div>
    </div>
  );
}