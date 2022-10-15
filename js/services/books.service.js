'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 5

var gFilterdBooksLength
var gCurrBookIdx
var gBooks
var gFilterBy = { txt: '', price: 100, rate: 0 }
var gPageIdx = 0

_createBooks()

function setBooksSort(prop){
    prop === 'name' ? gBooks.sort((a,b) => a.name.localeCompare(b.name)) : gBooks.sort((a,b) => a[prop] - b[prop])
}

function getCurrBookId(){
    return gBooks[gCurrBookIdx].id
}

function resetFilters() {
    gFilterBy = { txt: '', price: 100, rate: 0 }
}

function setBooksFilter(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.maxPrice !== undefined) gFilterBy.price = +filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.rate = +filterBy.minRate
    return gFilterBy
}

function getBooks() {
    var books = gBooks.filter(book => book.price <= gFilterBy.price &&
        book.rate >= gFilterBy.rate &&
        book.name.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    const startIdx = gPageIdx * PAGE_SIZE
    gFilterdBooksLength = books.length
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++
    enableBtn('.prev-page-btn')
    if ((gPageIdx + 1) * PAGE_SIZE >= gFilterdBooksLength) {
        disableBtn('.next-page-btn')
    }
}
function prevPage() {
    gPageIdx--
    enableBtn('.next-page-btn')
    if ((gPageIdx) * PAGE_SIZE < gFilterdBooksLength && gPageIdx === 0) {
        disableBtn('.prev-page-btn')
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook() {
    return {
        id: makeId(),
        name: makeRandName(),
        price: getRandomInt(30, 99),
        imgUrl: `book-cover${getRandomInt(1,8)}.jpg`,
        rate: getRandomInt(0, 10)
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBookById(id) {
    return gBooks.find(book => book.id === id)
}

function updateBook(id, newPrice) {
    var bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks[bookIdx].price = newPrice
    _saveBooksToStorage()
}

function deleteBook(id) {
    var bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function setCurrBook(id) {
    gCurrBookIdx = gBooks.findIndex(book => book.id === id)
}

function updateBookRating(rating) {
    gBooks[gCurrBookIdx].rate = rating
    _saveBooksToStorage()
}

function addBook(name, price) {
    var book = {
        id: makeId(),
        name,
        price,
        imgUrl: null
    }
    gBooks.push(book)
    _saveBooksToStorage()
}