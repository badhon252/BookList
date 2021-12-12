// let submit = document.querySelector("#submit");

// submit.addEventListener("click", function(e) {
//     let inputTitle = document.querySelector("#title");
//     let inputAuthor = document.querySelector("#author");
//     let inputIsbn = document.querySelector("#isbn");

//     let title = document.querySelector("#one");
//     let author = document.querySelector("#two");
//     let isbn = document.querySelector("#three");
//     let closeBtn = document.querySelector("#four");

//     title.innerHTML = inputTitle.value;
//     author.innerHTML = inputAuthor.value;
//     isbn.innerHTML = inputIsbn.value;

//     e.preventDefault();
// })

// book class

let form = document.querySelector("#book_form");

class Boook {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Ui {
  static addToBookList(book) {
    let list = document.querySelector("#book_list");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#">X</a></td>
        `;
    list.appendChild(row);
  }
  static clearFileds() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static showAlert(messege, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(messege));
    let container = document.querySelector(".container");
    let form = document.querySelector("#book_form");
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static deleteFromBook(target) {
    if (target.hasAttribute("href")) {
      target.parentElement.parentElement.remove();

      Store.removeBook(
        target.parentElement.previousElementSibling.textContent.trim()
      );

      Ui.showAlert("  Book Removed!", "remove");

      // console.log(target.parentElement.previousElementSibling);
    }
  }
}

// localStorage=========

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    let books = Store.getBooks();

    books.forEach((book) => {
      Ui.addToBookList(book);
    });
  }

  static removeBook(isbn) {
    let books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks());

// addEventListener
form.addEventListener("submit", function (e) {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  let book = new Boook(title, author, isbn);

  if (title === "" || author === "" || isbn === "") {
    // alert("please fill the all fields")
    Ui.showAlert("please fill all the fields!", "error");
  } else {
    let book = new Boook(title, author, isbn);
    Ui.addToBookList(book);
    Ui.clearFileds();
    Ui.showAlert("Book Aded!", "success");

    Store.addBook(book);
  }

  e.preventDefault();
});

// clearItem

document.querySelector("#book_list").addEventListener("click", function (e) {
  Ui.deleteFromBook(e.target);
  e.preventDefault();
});
