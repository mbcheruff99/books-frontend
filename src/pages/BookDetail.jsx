import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function BookDetail({ user }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [userShelves, setUserShelves] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookRes = await api.get(`/books/${id}`);
        setBook(bookRes.data);

        if (user) {
          const shelvesRes = await api.get("/shelves");
          setUserShelves(shelvesRes.data);
          setSelectedShelf(shelvesRes.data[0]?.id || "");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load book");
      }
    }

    fetchData();
  }, [id, user]);

  async function addToShelf() {
    if (!selectedShelf) return alert("Select a shelf first");
    setLoading(true);
    try {
      await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
      const shelf = userShelves.find(s => s.id === parseInt(selectedShelf));
      alert(`Added "${book.title}" to ${shelf?.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    } finally {
      setLoading(false);
    }
  }

  if (!book) return <div className="container mt-4">Loading...</div>;

  const formatShelfName = (name) =>
  name
    .split("_")                   // split on all underscores
    .map(word => word[0].toUpperCase() + word.slice(1)) // capitalize each word
    .join(" ");                    // join with spaces

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={book.cover || "/default-cover.png"}
            alt={book.title}
            className="img-fluid"
            style={{ width: "300px", height: "450px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <h5 className="text-muted">{book.author}</h5>
          <p><strong>Published:</strong> {book.published_year}</p>
          <p>
            <strong>Genres:</strong>{" "}
            {Array.isArray(book.genres)
              ? book.genres.join(", ")
              : book.genres || "No genres available"}
          </p>
          <p>{book.description || "No description available"}</p>

          {/* Shelf controls */}
          {user ? (
            userShelves.length === 0 ? (
              <p>
                You have no shelves yet. Create one on your <a href="/shelves">Shelves</a> page.
              </p>
            ) : (
              <>
                <select
                  className="form-select mb-2"
                  value={selectedShelf}
                  onChange={e => setSelectedShelf(e.target.value)}
                >
                  {userShelves.map(shelf => (
                    <option key={shelf.id} value={shelf.id}>
                      {formatShelfName(shelf.name)}
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
              </>
            )
          ) : (
            <p>
              Please <a href="/login">log in</a> to add this book to your shelves.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/api";

// export default function BookDetail({ user }) {
//   const { id } = useParams(); // get book id from URL
//   const [book, setBook] = useState(null);
//   const [userShelves, setUserShelves] = useState([]);
//   const [selectedShelf, setSelectedShelf] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Always fetch the book
//         const bookRes = await api.get(`/books/${id}`);
//         setBook(bookRes.data);

//         // Only fetch shelves if user is logged in
//         if (user) {
//           const shelvesRes = await api.get("/shelves");
//           setUserShelves(shelvesRes.data);
//           setSelectedShelf(shelvesRes.data[0]?.id || "");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load book");
//       }
//     }

//     fetchData();
//   }, [id, user]);

//   async function addToShelf() {
//     if (!selectedShelf) return alert("Select a shelf first");
//     setLoading(true);
//     try {
//       await api.post("/shelvings", { shelf_id: selectedShelf, book_id: book.id });
//       const shelf = userShelves.find(s => s.id === selectedShelf);
//       alert(`Added "${book.title}" to ${shelf?.name}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add book");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (!book) return <div className="container mt-4">Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-4">
//           <img
//             src={book.cover || "/default-cover.png"}
//             alt={book.title}
//             className="img-fluid"
//             style={{ width: "300px", height: "450px", objectFit: "cover" }}
//           />
//         </div>
//         <div className="col-md-8">
//           <h2>{book.title}</h2>
//           <h5 className="text-muted">{book.author}</h5>
//           <p><strong>Published:</strong> {book.published_year}</p>
//           <p>
//             <strong>Genres:</strong>{" "}
//             {Array.isArray(book.genres)
//               ? book.genres.join(", ")
//               : book.genres || "No genres available"}
//           </p>
//           <p>{book.description || "No description available"}</p>

//           {/* Only show shelf controls if user is logged in */}
//           {user && (
//             <>
//               {userShelves.length === 0 ? (
//                 <p>
//                   You have no shelves yet. Create one on your <a href="/shelves">Shelves</a> page.
//                 </p>
//               ) : (
//                 <>
//                   <select
//                     className="form-select mb-2"
//                     value={selectedShelf}
//                     onChange={e => setSelectedShelf(e.target.value)}
//                   >
//                     {userShelves.map(shelf => (
//                       <option key={shelf.id} value={shelf.id}>
//                         {shelf.name.replace("_", " ")}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     className="btn btn-success"
//                     onClick={addToShelf}
//                     disabled={loading || !selectedShelf}
//                   >
//                     {loading ? "Adding..." : "Add to Shelf"}
//                   </button>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
