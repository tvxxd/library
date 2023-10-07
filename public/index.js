const $form = document
  .querySelector(".add-book-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    if (library.addBookToLibrary(title, author, pages, isRead)) {
      clearform();
      render();
    }
  });

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggle() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(title, author, pages, isRead) {
    if (!this.valueCheck(title, author, pages)) {
      this.showError("Fill in all fields.");

      return false;
    }

    const newBook = new Book(title, author, pages, isRead);
    this.myLibrary.push(newBook);
    this.clearError();
    return true;
  }

  removeBook(index) {
    this.myLibrary.splice(index, 1);
  }

  valueCheck(title, author, pages) {
    return title.length > 0 || author.length > 0 || pages.length > 0;
  }
  showError(message) {
    const errorElement = document.getElementById("book-add-error");
    errorElement.textContent = message;
  }

  clearError() {
    const errorElement = document.getElementById("book-add-error");
    errorElement.textContent = "";
  }
}

const library = new Library();

// UI
const modal = document.querySelector(".modal");
const addBook = document.getElementById("addbook");
const overlay = document.querySelector(".overlay");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBook.addEventListener("click", openModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function render() {
  const bookCard = document.querySelector(".bookCard");
  bookCard.innerHTML = "";

  if (library.myLibrary.length > 0) {
    for (let i = 0; i < library.myLibrary.length; i++) {
      const book = library.myLibrary[i];
      const bookEl = document.createElement("div");
      bookEl.setAttribute("class", "book-box");
      bookEl.innerHTML = `<p class="title">Title: ${book.title}</p>
              <p class="author">Author: ${book.author}</p>
              <p class="pages">Pages: ${book.pages}</p>
              <div class="btn-group">
                  <button onclick="toggle(${i}); " class="read-book">${
        book.isRead ? "Read" : "Not Read"
      }</button >
              <button onclick="removeBook(${i})" class="remove-book">Remove</button>
              </div > `;
      bookCard.appendChild(bookEl);
    }
  }

  if (library.valueCheck("", "", "")) {
    closeModal();
  }
}

function toggle(index) {
  library.myLibrary[index].toggle();
  render();
}

function removeBook(index) {
  library.removeBook(index);
  render();
}

function clearform() {
  const $inputs = document.querySelectorAll("input");
  $inputs.forEach((input) => (input.value = ""));
}

render();
