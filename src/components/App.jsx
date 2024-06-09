import { useState } from "react";
import "../App.css";
import Logo from "./Logo";
import BookList from "./BookList";
import Summary from "./Summary";
import Form from "./Form";
import useBooks from "../hooks/useBooks";

export default function App() {
  const {
    books,
    handleAddBook,
    handleDeleteBook,
    handleToggleBook,
    handleClearAll,
  } = useBooks();
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
