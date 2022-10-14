'use strict'
const gTrans = {
    'header': {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'filter-header': {
        en: 'Filter',
        he: 'סנן לפי',
    },
    'filter-txt': {
        en: 'Type something...',
        he: 'הקלד כאן',
    },
    'max-price': {
        en: 'Max Price',
        he: 'מחיר מקסימלי'
    },
    'min-rate': {
        en: 'Min Rate',
        he: 'דירוג מינמלי',
    },
    'reset-filters': {
        en: 'Reset Filters',
        he: 'נקה מסננים',
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    'prev-page': {
        en: 'Previous Page',
        he: 'עמוד קודם',
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא',
    },
    'book-id': {
        en: 'id',
        he: 'מספר סידורי'
    },
    'book-title': {
        en: 'title',
        he: 'שם'
    },
    'book-price': {
        en: 'price',
        he: 'מחיר'
    },
    'book-rate': {
        en: 'rating',
        he: 'דירוג'
    },
    'book-actions': {
        en: 'actions',
        he: 'פעולות'
    }
}

let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatDate(time) {
    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }
    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}
