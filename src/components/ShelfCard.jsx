import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ShelfCard({ shelf, userShelves, onDelete }) {
  // console.log("Shelf object:", shelf);

  const navigate = useNavigate();

  const defaultShelves = ["want_to_read", "currently_reading", "read"];

  function formatShelfName(name) {
    return name
      .split("_") // split snake_case
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  // correctly check against backend normalized names
  const isDeletable = !defaultShelves.includes(shelf.name.toLowerCase());

  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{formatShelfName(shelf.name)}</h5>
        {isDeletable && onDelete && (
          <button
            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
            onClick={() => onDelete(shelf.id, shelf.name)}
            title="Delete Shelf"
          >
            <FaRegTrashCan className="tex-danger" />
          </button>
        )}
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
            <p>Shelf is empty</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/books")}>
              Browse Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
