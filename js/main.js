"use strict"

const pawnMoveAttack = () => {}

const startTimer = () => {
    generateLegalMoves()

    timers.timerTest = setInterval( 
        () => testMovement(), 500 
    )
}

startTimer()

const testMovement = () => {
    if ( !variables.victory && variables.legalMoves.length > 0 ) {
        const move = variables.legalMoves[ getRngInteger( 0, variables.legalMoves.length - 1 ) ]
        console.log( move, variables.legalMoves )        
        pieceMovement( move.mode, move.dash, move.piece, move.direction )
    }
    else clearInterval( timers.timerTest )
}

// const downMovement = ( piece, piecePhysical ) => {
//     piece.y++
//     piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
//     // console.log( piece.y )
//     if ( piece.y === constants.rowCount - 1 ) {
//         piecePhysical.innerHTML = 'Queen'
//         clearInterval( timers.timerDown )
//     }
// }

// const upMovement = ( piece, piecePhysical ) => {
//     piece.y--
//     piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
//     // console.log( piece.y )
//     if ( piece.y === 0 ) {
//         piecePhysical.innerHTML = 'Queen'
//         clearInterval( timers.timerUp )
//     }
// }

// const randomMovement = ( piece, piecePhysical ) => {
//     let x = piece.x + getRngInteger( -1, 1 )
//     if ( x < 0 ) x = 0
//     else if ( x >= constants.colCount ) x = constants.colCount - 1
//     piece.x = x
//     piecePhysical.style.left = x * constants.colWidth + 'px'
//     let y = piece.y + getRngInteger( -1, 1 )
//     if ( y < 0 ) y = 0
//     else if ( y >= constants.rowCount ) y = constants.rowCount - 1
//     piece.y = y
//     piecePhysical.style.top = y * constants.rowHeight + 'px'
//     console.log( x, y )
// }

const getRngInteger = ( min, max ) => {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

// timers.timerDown = setInterval( () => { downMovement( pieceB, pieceBlack ) }, 300 )

    // const pieceWhite = document.querySelector( '.piece-white' )
    // let pieceW = variables.pieces[ pieceWhite.id ]
    // timers.timerUp = setInterval( () => { upMovement( pieceW, pieceWhite ) }, 300 )


// let count = 0
// const testMovement = ( pieceB, pieceBlack, pieceW, pieceWhite ) => {
//     if ( count === 0 ) pawnMove( 'line', true, pieceB, pieceBlack )
//     else if ( count === 1 ) pawnMove( 'line', true, pieceB, pieceBlack )
//     else if ( count === 2 ) pawnMove( 'left', null, pieceB, pieceBlack )
//     else if ( count === 3 ) pawnMove( 'right', null, pieceB, pieceBlack )
//     else if ( count === 4 ) pawnMove( 'left', null, pieceB, pieceBlack )

//     else if ( count === 5 ) pawnMove( 'line', true, pieceW, pieceWhite )
//     else if ( count === 6 ) pawnMove( 'line', true, pieceW, pieceWhite )
//     else if ( count === 7 ) pawnMove( 'left', null, pieceW, pieceWhite )
//     else if ( count === 8 ) pawnMove( 'right', null, pieceW, pieceWhite )
//     else if ( count === 9 ) pawnMove( 'left', null, pieceW, pieceWhite )

//     else clearInterval( timers.timerTest )
//     count++
// }

//innerHtml
//innerText
//textContent - ?
// ctrl-d - select all; ctrl+shift+L
//parseInt, etc, parseFloat

//export default Class/other


// const board = document.getElementsByClassName( 'board' )
// setTimeout( pawnMove( 'line', true, pieceB, pieceBlack ), 1000 )