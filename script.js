const newBookBtn = document.querySelector("#new-book-btn")
const showOverlayBtn = document.querySelector('#add-button')
const closeFormBtn = document.querySelector('.close-btn')
const bookReadCounter = document.querySelector('#books-read')
const pagesReadCounter = document.querySelector('#pages-read')

const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggle = function() {
    this.read = !this.read
}

function toggle(index) {
    myLibrary[index].toggle()
    render()
}
 
function addBookToLibrary(){
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('#read').checked
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    render()
}

document.querySelector('#new-book-form').addEventListener('submit', function(event) {
    event.preventDefault()
    addBookToLibrary()
    off()
})

showOverlayBtn.addEventListener('click', function() {
    on()
})

closeFormBtn.addEventListener('click', function(event){
    event.preventDefault()
    off()
})
function render() {
    let libraryBook = document.querySelector('.card-container')
    libraryBook.innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i]
        let bookEl = document.createElement('div')
        bookEl.classList='card'
        bookEl.innerHTML = `<h4>${book.title}</h4>
                            <h5>${book.author}</h5>
                            <h6>${book.pages} pages</h6>
                            <p>${book.read ? 'read' : 'not read'}</p>
                            <button class='remove-btn' onclick='removeBook(${i})'>Remove</button>
                            <button class='toggle-btn' onclick='toggle(${i})'>Toggle Read</button>`
                            
                            
        libraryBook.appendChild(bookEl)
    }
    document.querySelector('#title').value = ""
    document.querySelector('#author').value = ""
    document.querySelector('#pages').value =  ""
    document.querySelector('#read').value = ""

    updateCounter()
    
}

function removeBook(index) {
    myLibrary.splice(index, 1)
    render();
}

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  function updateCounter() {
    let booksRead = 0;
    let pagesRead = 0;

    myLibrary.forEach(book => {
        if (book.read) {
            booksRead++;
            pagesRead += parseInt(book.pages);
        }
    });

    bookReadCounter.textContent = ` ${booksRead}`;
    pagesReadCounter.textContent = ` ${pagesRead}`;
  }

  