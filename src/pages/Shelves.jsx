import { useEffect, useState } from "react";
import api from "../api/api";
import ShelfCard from "./ShelfCard";

export default function Shelves() {
  const [shelves, setShelves] = useState([]);
  const [userShelves, setUserShelves] = useState([]);

  useEffect(() => {
    async function fetchShelves() {
      try {
        const res = await api.get("/shelves");
        setShelves(res.data);
        setUserShelves(res.data); // pass all shelves to BookCard for adding books
      } catch (err) {
        console.error(err);
        alert("Failed to load shelves");
      }
    }
    fetchShelves();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Shelves</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {shelves.map(shelf => (
          <div className="col" key={shelf.id}>
            <ShelfCard shelf={shelf} userShelves={userShelves} />
          </div>
        ))}
      </div>
    </div>
  );
}
