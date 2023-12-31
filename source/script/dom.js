function addBooks() {
    const bookTitle = document.getElementById('title').value
    const bookAuthor = document.getElementById('author').value
    const bookYear = document.getElementById('year').value
    const isCompleted = document.getElementById('isCompleted').checked
    const inputedBook = composeObject(+new Date, bookTitle, bookAuthor, bookYear, isCompleted)

    books.push(inputedBook)
    showBooks(inputedBook)
}



function showBooks(book) {
    let container = document.getElementById('unCompleted')
    const containerButton = document.createElement('div')
    const parentDiv  = document.createElement('div')
    parentDiv.classList.add('bookContainer')

    const ul = document.createElement('ul')
    const titleContainer = document.createElement('li')
    titleContainer.classList.add('title')
    const authorContainer = document.createElement('li')
    authorContainer.classList.add('author')

    titleContainer.innerText = book.title
    authorContainer.innerText = `${book.author} - ${book.year}`
    ul.append(titleContainer, authorContainer)

    const formId = document.createElement('input')
    formId.setAttribute('type', 'hidden')
    formId.setAttribute('value', book.id)

    parentDiv.append(ul, containerButton, formId)

        if(book.isComplete) {
            container = document.getElementById('completed')
            containerButton.append(deleteButton(), unCompletedButton())
        } else {
            containerButton.append(deleteButton(), completedButton())
        }
        
    container.append(parentDiv)
    saveToStorage()
}

// Button

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function deleteButton() {
    return createButton("delete-button", function (event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function completedButton(elem) {
    return createButton("completed-button", function (event) {
        addToCompletedBook(event.target.parentElement.parentElement)
    });
}

function unCompletedButton(elem) {
    return createButton("unCompleted-button", function (event) {
        addToUncompletedBook(event.target.parentElement.parentElement)
    });
}

function addToCompletedBook(taskElement) {
    // Get id from hidden input form
    const bookId = taskElement.querySelector('input').value
    const book = findBookIdFromData(bookId);
    book.isComplete = true

    showBooks(book)
    taskElement.remove();
}

function addToUncompletedBook(taskElement) {
    // Get id from hidden input form
    const bookId = taskElement.querySelector('input').value
    const book = findBookIdFromData(bookId);
    book.isComplete = false

    showBooks(book)
    taskElement.remove();
}

function removeBook(taskElement) {
    const warning = confirm('Apakah kamu yakin untuk menghapus buku ini?')
    if(warning) {
        const bookId = taskElement.querySelector('input').value
        for(let i = 0; i < books.length; i++) {
            if(books[i].id == bookId) {
                books.splice(i, 1);
            }
        }
        taskElement.remove();
    }
    saveToStorage()
}