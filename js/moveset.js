"use strict"

//generate all possible moves - test

//add draw end condition

//refactor: imports, classes

//controls: speed levels, start, stop, next move, etc

const pieceMovementValidation = ( mode, performDash, piece, direction ) => {
    let moveOk = false
    if ( piece.type === 'pawn' ) {

        if ( 
            ( direction === 1 && piece.y + 1 < constants.rowCount )
            || 
            ( direction === -1 && piece.y - 1 >= 0 ) 
        ) moveOk = true

        if ( moveOk && mode === 'line' ) {
            //
            moveOk = !locatePieceAt( piece, 0, direction, false )
            if ( moveOk && performDash && piece.moves !== 0 ) {
                moveOk = !locatePieceAt( piece, 0, direction * 2, false )
            }
        }
            // moveOk = canMove( piece, performDash, direction )
        else if ( 
            ( 
                moveOk && mode === 'left' 
                && piece.x - 1 < 0 
                && locatePieceAt( piece, -1, direction, false ) 
            )
            || 
            ( 
                moveOk && mode === 'right' 
                && piece.x + 1 >= constants.colCount - 1 
                && locatePieceAt( piece, 1, direction, false ) 
            )
        ) moveOk = false

    }
    return moveOk
}

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
                variables.pieces.splice( i, 1 )
                variables.piecesTaken.push( otherPiece )    
                document.getElementById( otherPiece.id ).style.visibility = 'hidden'
            }
            break
        }
    }
    return found
}

const generateLegalMoves = () => {
    variables.legalMoves = []

    for ( let i = 0; i < variables.pieces.length; i++ ) {
        generateLegalMovesSpecific( variables.pieces[i] )
    }
    
    //
}

const generateLegalMovesSpecific = ( piece ) => {
    if ( piece.type === 'pawn' ) {
        let direction
        if ( piece.color === 'Black' ) direction = 1
        else if ( piece.color === 'White' ) direction = -1
        //
        if ( pieceMovementValidation( 'line', true, piece, direction ) )
            variables.legalMoves.push( 
                { mode: 'line', dash: true, piece: piece, direction: direction } )
        if ( pieceMovementValidation( 'line', false, piece, direction ) )
            variables.legalMoves.push( 
                { mode: 'line', dash: false, piece: piece, direction: direction } )
        if ( pieceMovementValidation( 'left', false, piece, direction ) )
            variables.legalMoves.push( 
                { mode: 'left', dash: false, piece: piece, direction: direction } )
        if ( pieceMovementValidation( 'right', false, piece, direction ) )
            variables.legalMoves.push( 
                { mode: 'right', dash: false, piece: piece, direction: direction } )
    }
}

const pieceMovement = ( mode, performDash, piece, direction ) => {
    console.log( mode, performDash, piece, direction )    
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
    else generateLegalMoves()
}