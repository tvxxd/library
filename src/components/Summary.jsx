export default function Summary({ books }) {
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
