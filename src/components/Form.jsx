import { useState } from "react";

export default function Form({ onBookAdd }) {
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
        type="text" />
      <button>Add</button>
    </form>
  );
}
