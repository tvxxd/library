import { useState } from "react";
export default function useBooks() {
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

  return {
    books,
    handleAddBook,
    handleDeleteBook,
    handleToggleBook,
    handleClearAll,
  };
}
