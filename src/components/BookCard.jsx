import { useState } from "react";
import api from "../api/api";

export default function BookCard({ book, userShelves, onAdded }) {
  const [selectedShelf, setSelectedShelf] = useState(userShelves[0]?.id || null);
  const [loading, setLoading] = useState(false);

  async function addToShelf() {

    if (!selectedShelf) return alert("Please select a shelf first!");
    setLoading(true);
    try {
      await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
      alert(`Added "${book.title}" to ${selectedShelf.name}!`);
      if (onAdded) onAdded(); // optional callback to refresh parent
    } catch (err) {
      console.error(err);
      alert("Failed to add book to shelf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card h-100">
      <img src={book.cover} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>

        {/* Shelf selection dropdown */}
        <select
          className="form-select mb-2"
          value={selectedShelf || ""}
          onChange={e => setSelectedShelf(parseInt(e.target.value))}
        >
          {userShelves.map(shelf => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.name}
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