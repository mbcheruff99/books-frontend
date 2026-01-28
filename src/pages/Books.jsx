import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import BookCard from "../components/BookCard";
import "./Books.css";

export default function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [userShelves, setUserShelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.trim() || "";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch books with search query if present
        const booksRes = await api.get("/books", {
          params: query ? { q: query } : {},
        });
        setBooks(booksRes.data);

        // Only fetch shelves if the user is logged in
        if (user) {
          try {
            const shelvesRes = await api.get("/shelves");
            setUserShelves(shelvesRes.data);
          } catch (err) {
            console.error(err);
            setUserShelves([]);
          }
        } else {
          setUserShelves([]); // guest users get empty shelves
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, user]); // refetch when query or user changes

  if (loading) return <p className="text-center mt-4">Loading books...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>
        {query 
          ? `${books.length} search result${books.length !== 1 ? 's' : ''} for "${query}"`
          : "Browse All Books"}
      </h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div className="col" key={book.id}>
              <BookCard book={book} userShelves={userShelves} user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
