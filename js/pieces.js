"use strict"

import { rowHeight, colWidth } from './variables.js'

let pieces, board

export const setUpPieces = ( pieces_, board_ ) => {   
    pieces = pieces_
    board = board_
    createPiece( 'pawn' , 0, 0, 'Black', 'Pawn Black-1', 0 )
    createPiece( 'pawn' , 0, 5, 'White', 'Pawn White-1', 1 )

}

const createPiece = ( type, x, y, color, text, id ) => {
    let piece = {}
    piece.type = type
    piece.x = x
    piece.y = y
    piece.moves = 0
    piece.id = id
    piece.color = color
    pieces.push(piece)

    let piecePhysical = document.createElement( 'div' )
    piecePhysical.id = id
    piecePhysical.style.top = rowHeight * piece.y + 'px'
    piecePhysical.style.left = colWidth * piece.x + 'px'
    piecePhysical.className = 'piece piece-' + color
    piecePhysical.innerHTML = text
    board.appendChild( piecePhysical )
}