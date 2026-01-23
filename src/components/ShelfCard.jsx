import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";


export default function ShelfCard({ shelf, userShelves }) {
  const navigate = useNavigate();

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5>{shelf.name}</h5>
      </div>
      <div className="card-body">
        {shelf.books && shelf.books.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {shelf.books.map(book => (
              <div className="col" key={book.id}>
                <BookCard book={book} userShelves={userShelves} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Shelf is empty </p>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/books")}> Browse Books </button>
          </div>
          )}
      </div>
    </div>
  );
}

