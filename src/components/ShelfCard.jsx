import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // your axios instance
import { FaRegTrashCan } from "react-icons/fa6";

export default function ShelfCard({ shelf, userShelves, onDelete, onBookRemoved }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState(shelf.books || []);

  const defaultShelves = ["want_to_read", "currently_reading", "read"];
  const isDeletable = !defaultShelves.includes(shelf.name.toLowerCase());

  const toggleCollapse = () => setIsOpen(prev => !prev);

  const formatShelfName = (name) =>
    name
      .split("_")
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  const removeBook = async (bookId) => {
    try {
      await api.delete(`/shelvings/${bookId}`, { data: { shelf_id: shelf.id } });
      setBooks(prev => prev.filter(b => b.id !== bookId));
      if (onBookRemoved) onBookRemoved(shelf.id, bookId);
    } catch (err) {
      console.error(err);
      alert("Failed to remove book from shelf");
    }
  };

  return (
    <div className="card mb-3">
      {/* Header: Shelf name + book count */}
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer" }}
        onClick={toggleCollapse}
      >
        <strong>{formatShelfName(shelf.name)}</strong>
        <span>{books.length} {books.length === 1 ? "book" : "books"}</span>
        {isDeletable && onDelete && (
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={(e) => { e.stopPropagation(); onDelete(shelf.id, shelf.name); }}
            title="Delete Shelf"
          >
            <FaRegTrashCan />
          </button>
        )}
      </div>

      {/* Collapsible body */}
      {isOpen && (
        <div className="card-body">
          {books.length === 0 ? (
            <div>
              <p>Shelf is empty</p>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/books")}
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="list-group">
              {books.map(book => (
                <div
                  key={book.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={book.cover}
                      alt={book.title}
                      style={{ height: "60px", width: "40px", objectFit: "cover", marginRight: "10px" }}
                    />
                    <div>
                      <div><strong>{book.title}</strong></div>
                      <div className="text-muted" style={{ fontSize: "0.85rem" }}>{book.author}</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeBook(book.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
