import { useState } from "react";
import "./App.css";
import Logo from "./Logo";

export default function App() {
  const [books, setBooks] = useState([]);

  function handleAddBook(book) {
    setBooks((books) => [...books, book]);
  }

  function handleDeleteBook(id) {
    setBooks((books) => books.filter((book) => book.id !== id));
  }

  function handleToggleBook(id) {
    setBooks((books) =>
      books.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  }

  function handleClearAll() {
    setBooks([]);
  }

  return (
    <>
      <Logo />
      <Form onBookAdd={handleAddBook} />
      <BookList
        onHandleToggleBook={handleToggleBook}
        onDeleteBook={handleDeleteBook}
        books={books}
        handleClearAll={handleClearAll}
      />
      <Summary books={books} />
    </>
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
function BookList({ books, onDeleteBook, onHandleToggleBook, handleClearAll }) {
  const [sortBy, setSortBy] = useState("latest");

  let sorted;

  if (sortBy === "latest") sorted = books;
  if (sortBy === "name")
    sorted = books.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "quantity")
    sorted = books.slice().sort((a, b) => b.quantity - a.quantity);
  if (sortBy === "read")
    sorted = books.slice().sort((a, b) => Number(a.read) - Number(b.read));
  return (
    <>
      <div className="book-list">
        <ul>
          {sorted.map((book) => (
            <Book
              handleToggleBook={onHandleToggleBook}
              handleDeleteBook={onDeleteBook}
              key={book.id}
              book={book}
            />
          ))}
        </ul>
      </div>
      <div className="manage">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="latest">Sort by latest</option>
          <option value="name">Sort by name</option>
          <option value="quantity">Sort by quantity</option>
          <option value="read">Sort by read</option>
        </select>
        <button onClick={() => handleClearAll()}>Clear All</button>
      </div>
    </>
  );
}
function Book({ book, handleDeleteBook, handleToggleBook }) {
  return (
    <li key={book.id}>
      <input
        value={book.read}
        onChange={() => handleToggleBook(book.id)}
        type="checkbox"
      />
      <span className={book.read ? "selected" : ""}>
        {book.name}, {book.quantity}
      </span>
      <button onClick={() => handleDeleteBook(book.id)}>✖</button>
    </li>
  );
}
function Summary({ books }) {
  const bookquantity = books.length;
  const total = books
    .map((book) => book.quantity)
    .reduce((acc, val) => acc + val, 0);
  const booksRead = books.filter((book) => book.read).length;
  return (
    <div className="summary">
      {bookquantity > 0 ? (
        <p>
          You have {bookquantity} ({total}) books on the list, and you have read{" "}
          {booksRead}{" "}
        </p>
      ) : (
        "Add books on the list"
      )}
    </div>
  );
}
