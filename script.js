
// main

let books = [];

function Book(title, author, pages, read, added) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.added = added // additional flag for checking if a book exists in the gui
}

let library = document.getElementById('library');

function addBookToLibrary(book) {
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('id', book.title.split(' ').join(''));
    
    let title = document.createElement('h3')
    title.textContent = book.title;

    let author = document.createElement('h4');
    author.textContent = book.author;

    let pages = document.createElement('small');
    pages.textContent = book.pages + ' pages ';

    let read = document.createElement('small');
    read.textContent = book.read ? 'read' : 'not read yet' ;
    read.addEventListener('click', function() {
        if (book.read) {
            read.textContent = 'not read yet';
            book.read = false;
            console.log(book.read);
        } else {
            read.textContent = 'read';
            book.read = true;
            console.log(book.read);
        } updateStats();
    });

    library.appendChild(newBook);

    let topHalf = document.createElement('div');
    newBook.appendChild(topHalf);
    topHalf.appendChild(title);
    topHalf.appendChild(author);

    let bottomHalf = document.createElement('div');
    newBook.appendChild(bottomHalf);
    bottomHalf.appendChild(pages);
    bottomHalf.appendChild(read);

    let remove = document.createElement('button');
    remove.innerHTML = '<img src=\"resources/x-solid.svg\" alt=\"Remove\">';
    newBook.appendChild(remove);
    remove.addEventListener('click', function() {
        let confirmation = confirm(`Are you sure you want to remove ${book.title}?`);
        if (confirmation) {
            library.removeChild(newBook);
            books.splice(books.findIndex(bk => bk.title === book.title), 1); // shorter way to write this?
            updateLibrary();
        }
    });
}

function updateLibrary() {
    books.forEach(function (book) {
        if (!book.added) {
            addBookToLibrary(book);
            book.added = true;
        }
    }); updateStats();
}

function updateStats() {
    let booksInLibrary = 0;
    let booksRead = 0;
    let pagesRead = 0;
    books.forEach(function (book) {
        booksInLibrary++;
        if (book.read) {
            booksRead++;
            pagesRead += book.pages;
        }
    });
    document.getElementById('booksInLibrary').innerHTML = `<b>${booksInLibrary}</b>`;
    document.getElementById('booksRead').innerHTML = `<b>${booksRead}</b>`;
    document.getElementById('pagesRead').innerHTML = `<b>${pagesRead}</b>`;
}

let form = document.getElementById('addBook');

form.onsubmit = function(event) {
    let temp = bookRead.checked ? true : false ;
    let addition = new Book(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), temp, false);
    books.push(addition);
    updateLibrary();
    form.reset();
    event.preventDefault();
}

// just some dummy values to populate the library
let hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 300, false, false);
let gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 100, false, false);
let hamlet = new Book('The Tragedy of Hamlet', 'William Shakespeare', 200, false, false);
let longtitle = new Book('Sphinx of Black Quartz, Judge My Vow', 'Pseudonymous Alcedine', 413, false, false);
books.push(hobbit);
books.push(gatsby);
books.push(hamlet);
books.push(longtitle);
updateLibrary();