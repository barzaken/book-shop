'use strict'

var gIsModalShown = false
var gModelView = 'table'

function onInit() {
    readSearchParams()
    renderBooks()
}


function readSearchParams() {
    const params = new URLSearchParams(document.location.search)
    let txt = params.get('txt') || ''
    const elTxt = document.querySelector('.txt-search')
    elTxt.value = txt
    let maxPrice = params.get('price') || 100
    let minRate = params.get('minRate') || 0
    let bookId = params.get('bookId') || ''
    gCurrLang = params.get('lang')
    var elLangSelect = document.querySelector('.lang-select')
    elLangSelect.value = gCurrLang
    if (bookId) {
        let currBook = getBookById(bookId)
        console.log(currBook)
        openModal(currBook)
    }
    onSetFilterBy({ txt })
    onSetFilterBy({ maxPrice })
    onSetFilterBy({ minRate })
    doTrans(gCurrLang)
}

function onSetView(view){
    gModelView = `${view}`
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    if(gModelView === "table"){
    var strHtmls = books.map(book => {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}&#8362;</td>
        <td>${book.rate}</td>
        <td><button class="control read-btn" onclick="onReadBook('${book.id}')"></button>
        <button class="control update-btn" onclick="onUpdateBook('${book.id}')"></button>
        <button class="control delete-btn" onclick="onDeleteBook('${book.id}')"></button>
        </td>
        </tr>`
    })
    strHtmls.unshift(`<table class="table table-dark"><thead><tr>
        <th scope="col" data-trans="book-id">id</th>
        <th scope="col" data-trans="book-title">title</th>
        <th scope="col">price</th>
        <th scope="col">rate</th>
        <th scope="col">actions</th>
      </tr> </thead><tbody>`)
    strHtmls.push(`</tbody></table>`)
    } else {
        var strHtmls = books.map(book => {
            return `<div class="card" style="width: 18rem;">
            <img src="Img/${book.imgUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${book.name}</h5>
              <p class="card-text">price : ${book.price}</p>
              <p class="card-text">rate : ${book.rate}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')">Read</button>
                     <button type="button" class="btn btn-primary" onclick="onUpdateBook('${book.id}')">Update</button>
                     <button type="button" class="btn btn-primary" onclick="onDeleteBook('${book.id}')">Delete</button>
              </div>  
            </div>
          </div>`
        })
    }

    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}


function onReadBook(id) {
    var book = getBookById(id)
    setCurrBook(id)
    openModal(book)
    onSetFilterBy()
}

function openModal(book) {

    console.log('first')
    gIsModalShown = true;
    var elModal = document.querySelector('.book-modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('img').src = `img/${book.imgUrl}`
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('h5 span').innerText = book.rate
    elModal.classList.add('open')
}

function onUpdateBook(id) {
    var newPrice = prompt('Enter books new price')
    if (!newPrice) return
    updateBook(id, newPrice)
    renderBooks()
}

function onDeleteBook(id) {
    deleteBook(id)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Enter books name')
    var price = prompt('Enter books price')
    addBook(name, price)
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.book-modal').classList.remove('open')
    gIsModalShown = false
    onSetFilterBy()
}

function onUpdateCounter(action) {
    action === '+' ? document.querySelector('.counter-value').value++ : document.querySelector('.counter-value').value--
}

function onUpdateRating() {
    var rating = document.querySelector('.counter-value').value
    if (!rating || rating < 0 || rating > 10) return
    updateBookRating(rating)
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBooksFilter(filterBy)
    renderBooks()
    var queryStringParams = `?txt=${filterBy.txt}&price=${filterBy.price}&minRate=${filterBy.rate}`
    if (gIsModalShown) queryStringParams += `&bookId=${getCurrBookId()}`
    queryStringParams += `&lang=${gCurrLang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    renderBooks()
    doTrans()
    onSetFilterBy()
}

function setDirection(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}

function onNextPage() {
    nextPage()
    renderBooks()
}

function disableBtn(selector) {
    var btn = document.querySelector(`${selector}`)
    btn.disabled = true
}

function enableBtn(selector) {
    var btn = document.querySelector(`${selector}`)
    btn.disabled = false
}

function onPrevPage() {
    prevPage()
    renderBooks()
}

function onResetFilters() {
    resetFilters()
    onSetFilterBy()
    renderBooks()
}

function onSortClicked(prop) {
    setBooksSort(prop)
    renderBooks()
}

