"use strict"

const rowCount = 8
const colCount = 8
const rowHeight = 75
const colWidth = 75
const board = document.querySelector( '.board' ) //All

const drawBoard = () => {
    // const board = document.getElementsByClassName( 'board' )
    
    let content = ''
    // const rowHeight = 100 / rowCount
    // const colWidth = 100 / colCount
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

drawBoard()

const setUpPieces = () => {
    let piece = {}
    piece.type = 'pawn'
    piece.x = 0
    piece.y = 0
    pieces.push(piece)

    let piecePhysical = document.createElement( 'div' )
    piecePhysical.id = 0
    piecePhysical.style.top = rowHeight * piece.y + 'px'
    piecePhysical.style.left = colWidth * piece.x + 'px'
    piecePhysical.className = 'piece piece-black'
    piecePhysical.innerHTML = 'Pawn Black-1'
    board.appendChild( piecePhysical )

    //repetition

    piece = {}
    piece.type = 'pawn'
    piece.x = 2
    piece.y = 7
    pieces.push(piece)

    piecePhysical = document.createElement( 'div' )
    piecePhysical.id = 1
    piecePhysical.style.top = rowHeight * piece.y + 'px'
    piecePhysical.style.left = colWidth * piece.x + 'px'
    piecePhysical.className = 'piece piece-white'
    piecePhysical.innerHTML = 'Pawn White-1'
    board.appendChild( piecePhysical )
}

const pieces = []
setUpPieces()

const startTimer = () => {
    const pieceBlack = document.querySelector( '.piece-black' )
    let pieceB = pieces[ pieceBlack.id ]
    timerDown = setInterval( () => { downMovement( pieceB, pieceBlack ) }, 300 )

    const pieceWhite = document.querySelector( '.piece-white' )
    let pieceW = pieces[ pieceWhite.id ]
    timerUp = setInterval( () => { upMovement( pieceW, pieceWhite ) }, 300 )

    // setInterval( () => { randomMovement( piece ) }, 300 )
}

let timerDown
let timerUp
startTimer()

const downMovement = ( piece, piecePhysical ) => {
    piece.y++
    piecePhysical.style.top = piece.y * rowHeight + 'px'
    console.log( piece.y )
    if ( piece.y === rowCount - 1 ) {
        piecePhysical.innerHTML = 'Queen'
        clearInterval( timerDown )
    }
}

const upMovement = ( piece, piecePhysical ) => {
    piece.y--
    piecePhysical.style.top = piece.y * rowHeight + 'px'
    console.log( piece.y )
    if ( piece.y === 0 ) {
        piecePhysical.innerHTML = 'Queen'
        clearInterval( timerUp )
    }
}

const randomMovement = ( piece, piecePhysical ) => {
    let x = piece.x + getRngInteger( -1, 1 )
    if ( x < 0 ) x = 0
    else if ( x >= colCount ) x = colCount - 1
    piece.x = x
    piecePhysical.style.left = x * colWidth + 'px'
    let y = piece.y + getRngInteger( -1, 1 )
    if ( y < 0 ) y = 0
    else if ( y >= rowCount ) y = rowCount - 1
    piece.y = y
    piecePhysical.style.top = y * rowHeight + 'px'
    console.log( x, y )
}

const getRngInteger = ( min, max ) => {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

//innerHtml
//innerText
//textContent - ?
