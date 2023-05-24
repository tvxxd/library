function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;


}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}. ${this.pages} pages, ${this.isRead}`;
}

const book1 = new Book('The Hobbit', 'J.R.R', 295, 'not read yet');

console.log(book1.info());



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

