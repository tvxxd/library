import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <>
      <Logo />
      <Form />
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
function Form() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newBook = { id: Date.now(), name, quantity, read: false };

    console.log(newBook);
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
function BookList() {}
function Book() {}
function Summary() {}
