"use strict"

const createPiece = ( type, x, y, color, text, id ) => {
    let piece = {}
    piece.type = type
    piece.x = x
    piece.y = y
    piece.moves = 0
    piece.id = id
    piece.color = color
    variables.pieces.push(piece)

    let piecePhysical = document.createElement( 'div' )
    piecePhysical.id = id
    piecePhysical.style.top = constants.rowHeight * piece.y + 'px'
    piecePhysical.style.left = constants.colWidth * piece.x + 'px'
    piecePhysical.className = 'piece piece-' + color
    piecePhysical.innerHTML = text
    variables.board.appendChild( piecePhysical )
}

const setUpPieces = () => {

    createPiece( 'pawn' , 0, 0, 'Black', 'Pawn Black-1', 0 )
    createPiece( 'pawn' , 0, 2, 'White', 'Pawn White-1', 1 )

}

setUpPieces()