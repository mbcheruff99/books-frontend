import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/current_user"); // Rails endpoint for current user
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.delete("/sessions");
      setUser(null);
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">My Books</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/shelves">My Shelves</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Hi, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../api/api";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // fetch current user on mount
//   useEffect(() => {
//     async function fetchCurrentUser() {
//       try {
//         const res = await api.get("/current_user"); // or endpoint returning logged-in user
//         setUser(res.data.user);
//       } catch {
//         setUser(null);
//       }
//     }
//     fetchCurrentUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await api.delete("/sessions");
//       setUser(null);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed");
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container">
//         <Link className="navbar-brand" to="/">My Books</Link>

//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ms-auto">
//             {!user ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup">Signup</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/shelves">My Shelves</Link>
//                 </li>
//                 <li className="nav-item">
//                   <span className="nav-link">Hi, {user.name}</span>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }


// // import { Link } from "react-router-dom";

// // export default function Navbar() {
// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
// //       <div className="container">
// //         <Link className="navbar-brand" to="/">Book App</Link>
// //         <div className="collapse navbar-collapse">
// //           <ul className="navbar-nav ms-auto">
// //             <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
// //             <li className="nav-item"><Link className="nav-link" to="/shelves">Shelves</Link></li>
// //             <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
// //             <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }
