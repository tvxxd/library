export default function Book({ book, handleDeleteBook, handleToggleBook }) {
  return (
    <li key={book.id}>
      <input
        value={book.read}
        onChange={() => handleToggleBook(book.id)}
        type="checkbox" />
      <span className={book.read ? "selected" : ""}>
        {book.name}, {book.quantity}
      </span>
      <button onClick={() => handleDeleteBook(book.id)}>✖</button>
    </li>
  );
}
