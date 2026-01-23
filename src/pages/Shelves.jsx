import { useEffect, useState } from "react";
import api from "../api/api";

export default function Shelves() {
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    async function fetchShelves() {
      const res = await api.get("/shelves");
      setShelves(res.data);
    }
    fetchShelves();
  }, []);

  return (
    <div>
      {shelves.map(shelf => (
        <div key={shelf.shelf_id} className="mb-4">
          <h4>{shelf.name}</h4>
          <div className="row">
            {shelf.user.books.map(book => (
              <div key={book.id} className="col-md-2 mb-3">
                <div className="card">
                  <img src={book.cover} className="card-img-top" />
                  <div className="card-body">
                    <h6>{book.title}</h6>
                    <small>{book.author}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
