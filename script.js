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
    books = new Map();

    add(book) {
        if (!this.books.get(book.title)) {
            this.books.set(book.title, book);
            gui.addToLibrary(book);
        } 
        else {console.warn('This book is already added.')}
    }

    remove(title) {
        if (!this.books.get(title)) {console.warn('This book does not exist.')}
        else {this.books.delete(title);}
    }

    find(title) {
        if (!this.books.get(title)) {console.warn('This book does not exist.')}
        else {return this.books.get(title);}
    }

    getTotalPages() {
        let pages = 0;
        for (let book of this.books.values()) {
            if (book.read) {pages += book.pages;}
        }; return pages;
    }

    toggleRead(title) {
        this.books.get(title).read = (this.books.get(title).read) ? false : true ;
    }
};

const library = new Library;

class GUI {
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
        remove.innerHTML = '<img src=\"resources/x-solid.svg\" alt=\"Remove\">';
        bookLeaf.appendChild(remove);
        remove.addEventListener('click', function() {
            let confirmation = confirm(`Are you sure you want to remove ${book.title}?`);
            if (confirmation) {
                $('#library').removeChild(bookLeaf);
                library.remove(book.title);
                console.log(library.books);
            }
        });
    }
}

const gui = new GUI;

library.add(new Book('The Tragedy of Hamlet', 'William Shakespeare', 200, true));
library.add(new Book('The Hobbit', 'J.R.R Tolkien', 300, true));
library.add(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 100, true));








// library.add(new Book('The Tragedy of Hamlet', 'William Shakespeare', 176, true));
// console.log(library.books);

    
    
    

    
// }

// function updateLibrary() {
//     books.forEach(function (book) {
//         if (!book.added) {
//             addBookToLibrary(book);
//             book.added = true;
//         }
//     }); updateStats();
// }

// function updateStats() {
//     let booksInLibrary = 0;
//     let booksRead = 0;
//     let pagesRead = 0;
//     books.forEach(function (book) {
//         booksInLibrary++;
//         if (book.read) {
//             booksRead++;
//             pagesRead += book.pages;
//         }
//     });
//     document.getElementById('booksInLibrary').innerHTML = `<b>${booksInLibrary}</b>`;
//     document.getElementById('booksRead').innerHTML = `<b>${booksRead}</b>`;
//     document.getElementById('pagesRead').innerHTML = `<b>${pagesRead}</b>`;
// }

// let form = document.getElementById('addBook');

// form.onsubmit = function(event) {
//     let temp = bookRead.checked ? true : false ;
//     let addition = new Book(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), temp, false);
//     books.push(addition);
//     updateLibrary();
//     form.reset();
//     event.preventDefault();
// }

// // just some dummy values to populate the library
// let hobbit = 
// let gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 100, false, false);
// let hamlet = new Book('The Tragedy of Hamlet', 'William Shakespeare', 200, false, false);
// let longtitle = new Book('Sphinx of Black Quartz, Judge My Vow', 'Pseudonymous Alcedine', 413, false, false);
// books.push(hobbit);
// books.push(gatsby);
// books.push(hamlet);
// books.push(longtitle);
// updateLibrary();