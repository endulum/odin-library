
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
    // remove.classList.add('remove');
    // let removeId = book.title.split(' '); removeId.push('-remove');
    // // can't do this on one line so consolidated to above two lines.
    // // this is to set up the removal button's id such that it is uniquely
    // // identifiable with its parent book
    // remove.setAttribute('id', removeId.join(''));
    remove.innerHTML = '<img src=\"resources/x-solid.svg\" alt=\"Remove\">';
    newBook.appendChild(remove);

    remove.addEventListener('click', function() {
        library.removeChild(newBook);
    });
}

let hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 314, false);
let gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 108, true);

addBookToLibrary(hobbit);
addBookToLibrary(gatsby);