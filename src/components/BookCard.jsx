import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({ book, userShelves, user, onAdded }) {
  const [selectedShelf, setSelectedShelf] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Update selectedShelf when userShelves changes
  useEffect(() => {
    if (userShelves && userShelves.length > 0) {
      setSelectedShelf(userShelves[0].id);
    } else {
      setSelectedShelf("");
    }
  }, [userShelves]);

  function formatShelfName(name) {
    return name
      .split("_") 
      .map(word => word[0].toUpperCase() + word.slice(1)) 
      .join(" ");
  }

  async function addToShelf() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedShelf) return alert("Please select a shelf first!");

    const shelf = userShelves.find(s => s.id === selectedShelf);
    if (shelf && shelf.books && shelf.books.some(b => b.id === book.id)) {
      alert(`"${book.title}" is already on this shelf.`);
      return;
    }

    setLoading(true);
    try {
      await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
      const shelf = userShelves.find(s => s.id === selectedShelf);
      alert(`Added "${book.title}" to ${formatShelfName(shelf?.name)}!`);
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add book to shelf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card book-card">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/books/${book.id}`)}
      >
        <div className="book-card-img">
          <img src={book.cover} alt={book.title} />
        </div>
        <div className="card-body book-card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
        </div>
      </div>

      {/* Only show shelf controls if user is logged in */}
      {user && userShelves && userShelves.length > 0 && (
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
      )}

      {/* Show login prompt for guests */}
      {!user && (
        <div className="card-body">
          <button
            className="btn btn-sm btn-primary w-100"
            onClick={() => navigate("/login")}
          >
            Sign in to add to shelf
          </button>
        </div>
      )}
    </div>
  );
}
