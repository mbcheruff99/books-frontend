import { useNavigate } from "react-router-dom";
import { PiBooksThin, PiBookOpenThin, } from "react-icons/pi";
import { CiBookmarkCheck } from "react-icons/ci";
// import bookshelfImg from "../assets/bookshelf.jpg"; // make sure file exists

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 mb-3">Welcome to My Books!</h1>
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
          {/* <img
            src={bookshelfImg}
            alt="Bookshelf"
            className="img-fluid rounded shadow"
          /> */}
        </div>
      </div>

      <div className="mt-5 row text-center\\">
         <div className="col-md-4 d-flex flex-column align-items-center">
          <PiBookOpenThin size={47} className="text-primary mb-3"/>
          <h5>Discover Books</h5>
          <p>Browse all books and add them to your personal shelves easily.</p>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <PiBooksThin size={47} className="text-primary mb-3" />
          <h5>Create Shelves</h5>
          <p>Organize your books into Want to Read, Currently Reading, and Read shelves.</p>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <CiBookmarkCheck size={47} className="text-primary mb-3"/>
          <h5>Track Progress</h5>
          <p>Keep track of books you’ve read and plan what to read next.</p>
        </div>
      </div>
    </div>
  );
}


