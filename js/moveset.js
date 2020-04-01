"use strict"

//merge ifs, review code;
//generate all possible moves
//choose moves at random
//end game when needed
//add draw end condition

const pieceMovementValidation = ( mode, performDash, piece, direction ) => {
    let moveOk = false
    if ( piece.type === 'pawn' ) {

        if ( direction === 1 && piece.y + 1 < constants.rowCount ) 
            moveOk = true
        else if ( direction === -1 && piece.y - 1 >= 0 ) 
            moveOk = true

        if ( moveOk && mode === 'line' ) 
            moveOk = canMove( piece, performDash, direction )
        else if ( moveOk && mode === 'left' 
            && piece.x - 1 < 0 
            && locatePieceAt( piece, -1, direction, false ) ) 
            moveOk = false
        else if ( moveOk && mode === 'right' 
            && piece.x + 1 >= constants.colCount - 1 
            && locatePieceAt( piece, 1, direction, false ) ) 
            moveOk = false

    }
    return moveOk
}

const canMove = ( piece, dash, direction ) => {
    let allow = true
    allow = !locatePieceAt( piece, 0, direction, false )
    if ( dash && piece.moves !== 0 && allow ) {
        allow = !locatePieceAt( piece, 0, direction * 2, false )
    }
    return allow
}

// const checkForFreeSpace = ( piece, direction ) => {
//     let otherPiece
//     for ( let i = 0; i < variables.pieces.length; i++ ) {
//         otherPiece = variables.pieces[i]
//         if ( otherPiece.id !== piece.id 
//             && otherPiece.x === piece.x 
//             && otherPiece.y === piece.y + direction ) 
//             return false
//     }
//     return true
// }

const locatePieceAt = ( piece, xOffset, yOffset, takePiece ) => {
    let found = false
    let otherPiece
    for ( let i = 0; i < variables.pieces.length; i++ ) {
        otherPiece = variables.pieces[i]
        if ( otherPiece.id !== piece.id 
            && piece.x + xOffset === otherPiece.x 
            && piece.y + yOffset === otherPiece.y ) 
        {
            found = true
            if ( takePiece ) {
                console.log( 'taken!' )   
                variables.pieces.splice( i )
                variables.piecesTaken.push( otherPiece )    
                document.getElementById( otherPiece.id ).style.visibility = 'hidden'
            }
            break
        }
    }
    return found
}

// let direction
// if ( piece.color === 'Black' ) direction = 1
// else if ( piece.color === 'White' ) direction = -1

const pieceMovement = ( mode, performDash, piece, direction ) => {
    if ( piece.type === 'pawn' ) {

        if ( mode === 'left' ) piece.x--
        else if ( mode === 'right' ) piece.x++

        if ( mode === 'line' 
            && performDash 
            && piece.moves === 0 ) piece.y += direction * 2
        else piece.y += direction

    }
    piece.moves++
    const piecePhysical = document.getElementById( piece.id )
    piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
    piecePhysical.style.left = piece.x * constants.colWidth + 'px'
    locatePieceAt( piece, 0, 0, true )
    checkVictoryCondition()
}

const checkVictoryCondition = () => {
    let different = false
    if ( variables.pieces.length !== 1 ) {
        let piece
        for ( let i = 0; i < variables.pieces.length - 1; i++ ) {
            piece = variables.pieces[i]
            if ( piece.color !== variables.pieces[i+1].color ) {
                different = true
                break
            }
        }
    }
    if ( !different ) {
        console.log( variables.pieces[0].color + ' Wins!' )
        variables.victory = true
    }
}