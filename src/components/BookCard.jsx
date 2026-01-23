export default function BookCard({ book }) {
  return (
    <div className="card h-100">
      <img src={book.cover} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
      </div>
    </div>
  );
}
