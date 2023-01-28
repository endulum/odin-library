const $ = selector => document.querySelector(selector);

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    #books = new Map();

    get catalog() {
        return Array.from(this.#books.values());
    }

    add(book) {
        if (!this.#books.get(book.title)) {
            this.#books.set(book.title, book);
            gui.addToLibrary(book);
        } 
        else {console.warn('This book is already added.')}
    }

    remove(title) {
        if (!this.#books.get(title)) {console.warn('This book does not exist.')}
        else {this.#books.delete(title);}
    }

    find(title) {
        if (!this.#books.get(title)) {console.warn('This book does not exist.')}
        else {return this.#books.get(title);}
    }

    getTotalPages() {
        let pages = 0;
        for (let book of this.#books.values()) {
            if (book.read) {pages += book.pages;}
        }; return pages;
    }

    toggleRead(title) {
        this.#books.get(title).read = (this.#books.get(title).read) ? false : true ;
    }
};

const library = new Library;

class GUI {

    constructor() {
        $('.overlay').style.display = 'none';
        $('#add').addEventListener('click', function() {
            $('.overlay').style.display = 'flex';
            $('#add').style.pointerEvents = 'none';
        });
        $('#addBook .close').addEventListener('click', function() {
            $('.overlay').style.display = 'none';
            $('#add').style.pointerEvents = 'auto';
        })
        $('#addBook').onsubmit = function(event) {
            let temp = bookRead.checked ? true : false ;
            let addition = new Book(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), temp);
            library.add(addition);
            $('#addBook').reset();
            $('.overlay').style.display = 'none';
            $('#add').style.pointerEvents = 'auto';
            event.preventDefault();
        }
    }

    // unsure if an update function is needed, but just in case...

    // updateLibrary() {
    //     library.catalog.forEach(function (book) {
    //         console.log(book);
    //         if (!library.find(book.title)) {
    //             console.log('Adding book.');
    //             addToLibrary(book);
    //         } else {
    //             console.warn(book.title + ' is already added.')
    //         }
    //     });
    // }

    addToLibrary(book) {
        let bookLeaf = document.createElement('div');
        bookLeaf.classList.add('book');
        bookLeaf.setAttribute('id', book.title.split(' ').join(''));

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
                library.toggleRead(book.title);
            } else {
                read.textContent = 'read';
                library.toggleRead(book.title);
            }
        });
    
        $('#library').appendChild(bookLeaf);
    
        let topHalf = document.createElement('div');
        bookLeaf.appendChild(topHalf);
        topHalf.appendChild(title);
        topHalf.appendChild(author);
    
        let bottomHalf = document.createElement('div');
        bookLeaf.appendChild(bottomHalf);
        bottomHalf.appendChild(pages);
        bottomHalf.appendChild(read);
    
        let remove = document.createElement('button');
        remove.classList.add('close');
        remove.innerHTML = '<img src=\"resources/x-solid.svg\" alt=\"Remove\">';
        bookLeaf.appendChild(remove);
        remove.addEventListener('click', function() {
            let confirmation = confirm(`Are you sure you want to remove ${book.title}?`);
            if (confirmation) {
                $('#library').removeChild(bookLeaf);
                library.remove(book.title);
            }
        });
    }
}

const gui = new GUI;

library.add(new Book('The Tragedy of Hamlet', 'William Shakespeare', 200, false));
library.add(new Book('The Hobbit', 'J.R.R Tolkien', 300, false));
library.add(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 100, false));