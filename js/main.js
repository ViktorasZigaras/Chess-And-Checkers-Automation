"use strict"

let moveOk
const pawnMove = ( direction, performDash, piece, piecePhysical ) => {
    moveOk = false
    if ( piece.type === 'pawn' ) {
        if ( piece.color === 'black' ) {
            if ( piece.y + 1 < constants.rowCount ) {
                piece.y++
                moveOk = true
                if ( direction === 'line'
                    && performDash === true 
                    && piece.moves === 0 ) piece.y++
                else if ( direction === 'left' ) {
                    if ( piece.x - 1 >= 0 ) piece.x--
                    else moveOk = false
                }
                else if ( direction === 'right' ) {
                    if ( piece.x + 1 < constants.colCount ) piece.x++
                    else moveOk = false
                }
            }
        }
        if ( moveOk ) {
            piece.moves++
            piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
            piecePhysical.style.left = piece.x * constants.colWidth + 'px'
        }        
    }
}

const pawnMoveAttack = () => {}

const startTimer = () => {
    const pieceBlack = document.querySelector( '.piece-black' )
    let pieceB = variables.pieces[ pieceBlack.id ]
    timers.timerTest = setInterval( 
        () => { testMovement( pieceB, pieceBlack ) }, 500 
    )
}

startTimer()

let count = 0
const testMovement = ( piece, piecePhysical ) => {
    if ( count === 0 ) pawnMove( 'line', null, piece, piecePhysical )
    else if ( count === 1 ) pawnMove( 'line', true, piece, piecePhysical )
    else if ( count === 2 ) pawnMove( 'left', null, piece, piecePhysical )
    else if ( count === 3 ) pawnMove( 'right', null, piece, piecePhysical )
    else if ( count === 4 ) pawnMove( 'left', null, piece, piecePhysical )
    else clearInterval( timers.timerTest )
    count++
}

const downMovement = ( piece, piecePhysical ) => {
    piece.y++
    piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
    // console.log( piece.y )
    if ( piece.y === constants.rowCount - 1 ) {
        piecePhysical.innerHTML = 'Queen'
        clearInterval( timers.timerDown )
    }
}

const upMovement = ( piece, piecePhysical ) => {
    piece.y--
    piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
    // console.log( piece.y )
    if ( piece.y === 0 ) {
        piecePhysical.innerHTML = 'Queen'
        clearInterval( timers.timerUp )
    }
}

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

//innerHtml
//innerText
//textContent - ?
// const board = document.getElementsByClassName( 'board' )
// setTimeout( pawnMove( 'line', true, pieceB, pieceBlack ), 1000 )