"use strict"

const pieceMovement = ( direction, performDash, piece ) => {
    let moveOk = false
    if ( piece.type === 'pawn' ) {
        if ( piece.color === 'Black' ) {
            if ( piece.y + 1 < constants.rowCount ) {
                moveOk = true
                if ( direction === 'line'
                    && performDash === true 
                    && piece.moves === 0
                    && canDash( piece ) ) piece.y++
                else if ( direction === 'left' ) {
                    if ( piece.x - 1 >= 0 ) piece.x--
                    else moveOk = false
                }
                else if ( direction === 'right' ) {
                    if ( piece.x + 1 < constants.colCount ) piece.x++
                    else moveOk = false
                }
            }
            if ( moveOk ) piece.y++
        }
        else if ( piece.color === 'White' ) {
            if ( piece.y - 1 >= 0 ) {
                moveOk = true
                if ( direction === 'line'
                    && performDash === true 
                    && piece.moves === 0 ) piece.y--
                else if ( direction === 'left' ) {
                    if ( piece.x - 1 >= 0 ) piece.x--
                    else moveOk = false
                }
                else if ( direction === 'right' ) {
                    if ( piece.x + 1 < constants.colCount ) piece.x++
                    else moveOk = false
                }
            }
            if ( moveOk ) piece.y--
        }     
    }
    if ( moveOk ) {
        piece.moves++
        const piecePhysical = document.getElementById( piece.id )
        piecePhysical.style.top = piece.y * constants.rowHeight + 'px'
        piecePhysical.style.left = piece.x * constants.colWidth + 'px'
        checkPieceTaking( piece )
        checkVictory()
    } 
}

const canDash = ( piece ) => {
    let otherPiece
    let allow = true
    for ( let i = 0; i < variables.pieces.length; i++ ) {
        otherPiece = variables.pieces[i]
        if ( otherPiece.x === piece.x
            && ( 
                ( piece.color === 'Black' && otherPiece.y === piece.y + 2 ) 
                || ( piece.color === 'White' && otherPiece.y === piece.y - 2 ) 
            ) 
        ) {
            allow = false
            break
        }
    }
    return allow
}

const checkPieceTaking = ( piece ) => {
    let otherPiece
    for ( let i = 0; i < variables.pieces.length; i++ ) {
        otherPiece = variables.pieces[i]
        if ( otherPiece.id !== piece.id 
            && piece.x === otherPiece.x 
            && piece.y === otherPiece.y ) 
        {
            console.log( 'taken!' )   
            variables.pieces.splice( i )
            variables.piecesTaken.push( otherPiece )    
            document.getElementById( otherPiece.id ).style.visibility = 'hidden'
            break
        }
    }
}

const checkVictory = () => {
    let different = false
    if ( variables.pieces.length !== 1 ) {
        let piece
        for ( let i = 0; i < variables.pieces.length - 1; i++ ) {
            piece = variables.pieces[i]
            if ( piece.color !== variables.pieces[i+1].color ) different = true
        }
    }
    if ( !different ) {
        console.log( variables.pieces[0].color + ' Wins!' )
        variables.victory = true
    }
}