import { useNavigate } from "react-router-dom";
import bookshelfImg from "../assets/bookshelf.jpg"; // put an image in src/assets

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      {/* Hero Section */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 mb-3">Welcome!</h1>
          <p className="lead mb-4">
            Browse, track, and organize your favorite books. Start building your personal library today!
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/books")}
          >
            Browse Books
          </button>
        </div>

        <div className="col-md-6">
          <img
            src={bookshelfImg}
            alt="Bookshelf"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Optional: features / getting started */}
      <div className="mt-5 row text-center">
        <div className="col-md-4">
          <h5>Create Shelves</h5>
          <p>Organize your books into Want to Read, Currently Reading, and Read shelves.</p>
        </div>
        <div className="col-md-4">
          <h5>Track Progress</h5>
          <p>Keep track of books you’ve read and plan what to read next.</p>
        </div>
        <div className="col-md-4">
          <h5>Discover Books</h5>
          <p>Browse all books and add them to your personal shelves easily.</p>
        </div>
      </div>
    </div>
  );
}
