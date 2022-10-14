'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeRandName(wordCount = 3) {
    const firstWords = ['The legend','The story of','We Are' , 'Lets learn' , 'Lets play']
    const secondWords = ['zelda','potter','soccer','javascript','html','css']
    var txt = ''
    txt += firstWords[Math.floor(Math.random() * firstWords.length)] + ' '
    txt += secondWords[Math.floor(Math.random() * secondWords.length)] + ' '
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}