class Book {
    constructor(title, author, body) {
      this.title = title;
      this.author = author;
      this.body = body;
    }
  }
  
  class Purposes {
    static displayBooks() {
      const books = Store.getBooks();
      books.forEach((book) => Purposes.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');
      row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.body}</td> <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
      list.appendChild(row);  
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static Alert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }
  
    static clearAll() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#body').value = '';
    }
  }
  
  // For Handling Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(body) {
      const books = Store.getBooks();
      books.forEach((book, index) => {
        if(book.body === body) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Displaying Books
  document.addEventListener('DOMContentLoaded', Purposes.displayBooks);
  
  //Adding a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const body = document.querySelector('#body').value;

    if(title === '' || author === '' || body === '') {
      Purposes.Alert('Please fill all fields', 'danger');
    } else {
      const book = new Book(title, author, body);
      Purposes.addBookToList(book);
      Store.addBook(book);
      Purposes.Alert('Book Added', 'success');
      Purposes.clearAll();
    }
  });
  
  //Removing a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    Purposes.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    Purposes.Alert('Book Removed', 'success');
  });