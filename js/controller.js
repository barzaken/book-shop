'use strict'

var gIsModalShown = false

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
    let bookId = params.get('bookId')
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

function renderBooks() {
    var books = getBooks()
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
  
    document.querySelector('.books-content').innerHTML = strHtmls.join('')
}


function onReadBook(id) {
    var book = getBookById(id)
    setCurrBook(id)
    openModal(book)
    onSetFilterBy()
}
function openModal(book) {
    gIsModalShown = true;
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
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
    document.querySelector('.modal').classList.remove('open')
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
    doTrans()
    renderBooks()
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

