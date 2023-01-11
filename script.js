
let library = document.getElementById('library');

let books = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

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
        }
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
        library.removeChild(newBook);
    });
}

// temp vars

let hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 314, false);
let gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 108, true);

books.push(hobbit);
books.push(gatsby);

function updateLibrary() {
    books.forEach(function (book) {
        addBookToLibrary(book);
    });
}

updateLibrary();