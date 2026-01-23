import { useEffect, useState } from "react";
import api from "../api/api";
import BookCard from "../components/BookCard";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [userShelves, setUserShelves] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, shelvesRes] = await Promise.all([
          api.get("/books"),
          api.get("/shelves") // get all user shelves
        ]);
        setBooks(booksRes.data);
        setUserShelves(shelvesRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load data");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Browse All Books</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map(book => (
          <div className="col" key={book.id}>
            <BookCard book={book} userShelves={userShelves} />
          </div>
        ))}
      </div>
    </div>
  );
}
