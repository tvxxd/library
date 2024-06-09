import { useState } from "react";
import Book from "./Book";

export default function BookList({
  books,
  onDeleteBook,
  onHandleToggleBook,
  handleClearAll,
}) {
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
