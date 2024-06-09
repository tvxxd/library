import { useState } from "react";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);

  function handleAddBook(book) {
    setBooks((books) => [...books, book]);
    console.log(books);
  }

  return (
    <>
      <Logo />
      <Form onBookAdd={handleAddBook} />
      <BookList books={books} />
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src="../src/assets/l.png" alt="library" />
    </div>
  );
}
function Form({ onBookAdd }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newBook = { id: Date.now(), name, quantity, read: false };

    onBookAdd(newBook);

    setQuantity(1);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <p>Which book would you like to add? 📚</p>
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Book name"
        type="text"
      />
      <button>Add</button>
    </form>
  );
}
function BookList({ books }) {
  return (
    <div className="book-list">
      <ul>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}
function Book({ book }) {
  return (
    <li key={book.id}>
      <input type="checkbox" />
      <span className={book.read ? "selected" : ""}>
        {book.name}, {book.quantity}
      </span>
      <button>✖</button>
    </li>
  );
}
function Summary() {}
