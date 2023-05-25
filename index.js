// ds

const $form = document.querySelector('.add-book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    addBookToLibrary();
    clearform();
    render();
})

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

Book.prototype.toggle = function () {
    this.isRead = !this.isRead;
}

function toggle(index) {
    myLibrary[index].toggle();
    render();
}

function readUpdate() {

}

let myLibrary = [];

const $title = document.getElementById('title');
const $author = document.getElementById('author');
const $pages = document.getElementById('pages');
const $status = document.getElementById('isRead');

function addBookToLibrary() {
    valueCheck();
    const newBook = new Book($title.value, $author.value, $pages.value, $status.checked);

    myLibrary.push(newBook);

}

function removeBook(index) {
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    updateUI();
    render();
}

const booksGrid = document.getElementById('booksGrid');

function updateUI() {
    booksGrid.innerHTML = "";
}

function clearform() {
    const $inputs = document.querySelectorAll('input');
    $inputs.forEach(input => input.value = '');
}

let check = true;

function valueCheck() {
    if ($title.value.length === 0 || $author.value.length === 0 || $pages.value.length === 0) {
        alert("Fill all the fields");
        check = false;
        return false;
    }
    check = true;
}


// UI

const modal = document.querySelector('.modal');
const addBook = document.getElementById('addbook');
const overlay = document.querySelector('.overlay');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

addBook.addEventListener('click', openModal);


document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


function render() {
    const bookCard = document.querySelector('.bookCard');
    const bookEl = document.createElement('div');
    bookEl.innerHTML = "";
    if (check) {
        for (let i = 0; i < myLibrary.length; i++) {
            let book = myLibrary[i];
            bookEl.setAttribute('class', 'book-box');
            bookEl.innerHTML = `<p class="title">Title: ${book.title}</p>
            <p class="author">Author: ${book.author}</p>
            <p class="pages">Pages: ${book.pages}</p>
            <div class="btn-group">
                <button onclick="toggle(${i})" class="read-book">${book.isRead ? "Read" : "Not Read"}</button>
                <button onclick="removeBook(${i})" class="remove-book">Remove</button>
            </div>`
            bookCard.appendChild(bookEl);
        }
    }
    if (check) {
        closeModal();
    }

}

