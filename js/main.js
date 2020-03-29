"use strict"

const rowCount = 8
const colCount = 8

const drawBoard = () => {
    // const board = document.getElementsByClassName( 'board' )
    const board = document.querySelector( '.board' ) //All
    let content = ''
    // const rowHeight = 100 / rowCount
    // const colWidth = 100 / colCount
    const rowHeight = 75
    const colWidth = 75
    let color = ''
    for ( let y = 0; y < rowCount; y++ ) {
        content += `<div class="row" style="height: ${ rowHeight }px">`
        //
        for ( let x = 0; x < colCount; x++ ) {
            if ( 
                ( y % 2 === 1 && x % 2 === 0 ) ||
                ( y % 2 === 0 && x % 2 === 1 )
                //( (x + y) % 2 === 0 )
            ) color = 'black'
            else color = 'white'
            content += `<div class="column ${ color }" style="width: ${ colWidth }px"> </div>`
            //
        }
        content += `</div>`
    }
    board.innerHTML = content
}
// var object = document.createElement('container');
// object.style.width= "500px";
// object.style.height= "600px";

drawBoard()

const setUpPieces = () => {
    let piece = {}
    piece.type = 'pawn'
    piece.x = 5
    piece.y = 3
    pieces.push(piece)

    const board = document.querySelector( '.board' )
    let content = `<div class="piece" id="0" style="top: ${ 75 * piece.y }px; left: ${ 75 * piece.x }px"></div>`
    board.innerHTML += content
}

const pieces = []
setUpPieces()

const startTimer = () => {
    const piecePhysical = document.querySelector( '.piece' )
    const piece = pieces[ piecePhysical.id ]
    setInterval(
        () => {
            let x = piece.x + getRngInteger( -1, 1 )
            if ( x < 0 ) x = 0
            else if ( x >= colCount ) x = colCount - 1
            piece.x = x
            piecePhysical.style.left = x * 75 + 'px'
            let y = piece.y + getRngInteger( -1, 1 )
            if ( y < 0 ) y = 0
            else if ( y >= rowCount ) y = rowCount - 1
            piece.y = y
            piecePhysical.style.top = y * 75 + 'px'
            console.log( x, y )
            
        }, 100
    )
}

startTimer()

const getRngInteger = ( min, max ) => {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

