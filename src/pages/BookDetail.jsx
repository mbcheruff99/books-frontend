import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function BookDetail() {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const [userShelves, setUserShelves] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookRes, shelvesRes] = await Promise.all([
          api.get(`/books/${id}`),
          api.get("/shelves")
        ]);
        setBook(bookRes.data);
        setUserShelves(shelvesRes.data);
        setSelectedShelf(shelvesRes.data[0]?.id || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load book");
      }
    }
    fetchData();
  }, [id]);

  async function addToShelf() {
    if (!selectedShelf) return alert("Select a shelf first");
    setLoading(true);
    try {
      await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
      const shelf = userShelves.find(s => s.id === selectedShelf);
      alert(`Added "${book.title}" to ${shelf?.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    } finally {
      setLoading(false);
    }
  }

  if (!book) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={book.cover} alt={book.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <h5 className="text-muted">{book.author}</h5>
          <p><strong>Published:</strong> {book.published_year}</p>
          <p><strong>Genres:</strong> {book.genres?.join(", ") || "No genres available"} </p>
          <p>{book.description}</p>

          <select
            className="form-select mb-2"
            value={selectedShelf}
            onChange={e => setSelectedShelf(parseInt(e.target.value))}
          >
            {userShelves.map(shelf => (
              <option key={shelf.id} value={shelf.id}>
                {shelf.name.replace("_", " ")}
              </option>
            ))}
          </select>
          <button
            className="btn btn-success"
            onClick={addToShelf}
            disabled={loading || !selectedShelf}
          >
            {loading ? "Adding..." : "Add to Shelf"}
          </button>
        </div>
      </div>
    </div>
  );
}
