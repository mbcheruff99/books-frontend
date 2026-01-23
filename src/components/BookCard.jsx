import { useState } from "react";
import api from "../api/api"
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, shelfId }) {
  const navigate = useNavigate()
  
  async function addToShelf(bookId) {
   try {
      await api.post("/shelvings", { shelf_id: shelfId, book_id: bookId });
      if (window.confirm("Book added! See it in your shelf")) { // ?????
        navigate("/shelves");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add book to shelf");
    }
  }


  return (
    <div className="card h-100">
      <img src={book.cover} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <button className="btn btn-sm btn-success" onClick={() => addToShelf(book.id)}>Add to Read</button>
      </div>
    </div>
  );
  
}
