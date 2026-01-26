import { useEffect, useState } from "react";
import api from "../api/api";
import ShelfCard from "../components/ShelfCard";

export default function Shelves({ user }) {
  const [shelves, setShelves] = useState([]);
  const [newShelfName, setNewShelfName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user shelves when user is logged in
  useEffect(() => {
    if (!user) return; // skip if not logged in
    async function fetchShelves() {
      try {
        const res = await api.get("/shelves");
        setShelves(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load shelves");
      }
    }
    fetchShelves();
  }, [user]);

  // Create a new shelf
  async function createShelf(e) {
    e.preventDefault();
    if (!newShelfName.trim()) return alert("Shelf name cannot be empty");

    setLoading(true);
    try {
      const res = await api.post("/shelves", { name: newShelfName });
      setShelves(prev => [...prev, res.data]);
      setNewShelfName(""); // reset input
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.errors?.[0] || "Failed to create shelf";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  // Delete a shelf
  async function deleteShelf(shelfId, shelfName) {
    if (!user) return; // only logged-in users can delete
    const defaultShelves = ["Want to Read", "Currently Reading", "Read"];
    if (defaultShelves.includes(shelfName)) {
      alert("Default shelves cannot be deleted");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this shelf? All books in it will also be removed.")) return;

    try {
      await api.delete(`/shelves/${shelfId}`);
      setShelves(prev => prev.filter(s => s.id !== shelfId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete shelf");
    }
  }

  if (!user) return <p className="mt-4">Please <a href="/login">log in</a> to see your shelves.</p>;

  return (
    <div className="container mt-4">
      <h2>My Shelves</h2>

      {/* Create Shelf Form */}
      <div className="mb-4">
        <form className="d-flex" onSubmit={createShelf}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="New Shelf Name (example: Historical Fiction)"
            value={newShelfName}
            onChange={e => setNewShelfName(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Shelf"}
          </button>
        </form>
      </div>

      {/* Display Shelves */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {shelves.map(shelf => (
          <div className="col" key={shelf.id}>
            <ShelfCard
              shelf={shelf}
              user={user}
              userShelves={shelves}
              onDelete={deleteShelf}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import api from "../api/api";
// import ShelfCard from "../components/ShelfCard";

// export default function Shelves({user}) {
//   const [shelves, setShelves] = useState([]);
//   const [newShelfName, setNewShelfName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch user shelves when user is logged in
//   useEffect(() => {
//   if (!user) return; // add this line
//   async function fetchShelves() {
//     try {
//       const res = await api.get("/shelves");
//       setShelves(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load shelves");
//     }
//   }
//   fetchShelves();
// }, [user]);


//   // Create a new shelf
//   async function createShelf(e) {
//     e.preventDefault();
//     if (!newShelfName.trim()) return alert("Shelf name cannot be empty");

//     setLoading(true);
//     try {
//       const res = await api.post("/shelves", { name: newShelfName });
//       setShelves(prev => [...prev, res.data]);
//       setNewShelfName(""); // reset input
//     } catch (err) {
//       console.error(err);
//       // Rails backend returns 422 with validation errors
//       const message = err.response?.data?.errors?.[0] || "Failed to create shelf";
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Delete a shelf
//   async function deleteShelf(shelfId, shelfName) {
//     // console.log("Deleting shelf:", shelfId, shelfName);
//     const defaultShelves = ["Want to Read", "Currently Reading", "Read"];
//     if (defaultShelves.includes(shelfName)) {
//       alert("Default shelves cannot be deleted");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this shelf? All books in it will also be removed.")) return;

//     try {
//       await api.delete(`/shelves/${shelfId}`);
//       setShelves(prev => prev.filter(s => s.id !== shelfId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete shelf");
//     }
//   }

//   return (
//     <div className="container mt-4">
//       <h2>My Shelves</h2>

//       {/* Create Shelf Form */}
//       <div className="mb-4">
//         <form className="d-flex" onSubmit={createShelf}>
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="New Shelf Name (example: Historical Fiction)"
//             value={newShelfName}
//             onChange={e => setNewShelfName(e.target.value)}
//           />
//           <button className="btn btn-primary" type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Shelf"}
//           </button>
//         </form>
//       </div>

//       {/* Display Shelves */}
//       <div className="row row-cols-1 row-cols-md-2 g-4">
//         {shelves.map(shelf => (
//           <div className="col" key={shelf.id}>
//             <ShelfCard
//               shelf={shelf}
//               user={user}
//               userShelves={shelves}
//               onDelete={deleteShelf}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }