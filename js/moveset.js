"use strict"

import * as constants from './variables.js'

export default class MoveSet {
    constructor( main ) {
        this.main = main
        console.log(main)
    }

    generateLegalMoves = () => {
        this.main.legalMovesWhite = []
        this.main.legalMovesBlack = []
        for ( let i = 0; i < this.main.pieces.length; i++ ) {
            this.generateLegalMovesSpecific( this.main.pieces[i] )
        }
        if ( this.main.legalMovesWhite.length === 0 || this.main.legalMovesBlack.length === 0 ) {
            console.log( 'Draw!' )
            // setTimeout( () => alert( 'Draw!' ), 100 )
            this.main.victory = true
        }
    }

    generateLegalMovesSpecific = ( piece ) => {
        if ( piece.type === 'pawn' ) {
            let direction
            let legalMoves
            if ( piece.color === 'Black' ) {
                legalMoves = this.main.legalMovesBlack
                direction = 1
            }
            else if ( piece.color === 'White' ) {
                legalMoves = this.main.legalMovesWhite
                direction = -1
            }
            this.moveGeneral = { 
                info: piece.color + ' ' + piece.type + '-' + piece.id, 
                piece: piece, 
                direction: direction 
            }
            this.checkMove( 'line', true, piece, direction, legalMoves )
            this.checkMove( 'line', false, piece, direction, legalMoves )
            this.checkMove( 'left', null, piece, direction, legalMoves )
            this.checkMove( 'right', null, piece, direction, legalMoves )
        }
    }

    checkMove = ( mode, performDash, piece, direction, legalMoves ) => {
        let moveDetails
        if ( this.pieceMovementValidation( mode, performDash, piece, direction ) ) 
        {
            moveDetails = { ...this.moveGeneral }
            moveDetails.mode = mode
            moveDetails.dash = performDash
            legalMoves.push( moveDetails )
        }
    }

    pieceMovementValidation = ( mode, performDash, piece, direction ) => {
        let moveOk = false
        if ( piece.type === 'pawn' ) {
    
            if ( 
                ( direction === 1 && piece.y + 1 < constants.rowCount ) || 
                ( direction === -1 && piece.y - 1 >= 0 ) 
            ) 
                moveOk = true
    
            if ( moveOk && mode === 'line' ) {
                moveOk = !this.locatePieceAt( piece, 0, direction, false )
                if ( performDash ) {
                    if ( moveOk && piece.moves === 0 ) {
                        moveOk = !this.locatePieceAt( piece, 0, direction * 2, false )
                    }
                    else moveOk = false
                }
            }
            else if ( 
                moveOk && (
                    ( mode === 'left' && (
                            ( piece.x - 1 < 0 ) ||
                            ( !this.locatePieceAt( piece, -1, direction, false ) )
                        )
                    ) ||
                    ( mode === 'right' && (
                            ( piece.x + 1 >= constants.colCount - 1 ) ||
                            ( !this.locatePieceAt( piece, 1, direction, false ) )
                        )
                    )
                )
            ) 
                moveOk = false
    
        }
        return moveOk
    }

    locatePieceAt = ( piece, xOffset, yOffset, takePiece ) => {
        let found = false
        let otherPiece
        for ( let i = 0; i < this.main.pieces.length; i++ ) {
            otherPiece = this.main.pieces[i]
            if ( otherPiece.id !== piece.id 
                && piece.x + xOffset === otherPiece.x 
                && piece.y + yOffset === otherPiece.y ) 
            {
                found = true
                if ( takePiece ) {
                    console.log( 'taken!' )   
                    this.main.pieces.splice( i, 1 )
                    this.main.piecesTaken.push( otherPiece )    
                    document.getElementById( otherPiece.id ).style.visibility = 'hidden'
                }
                break
            }
        }  
        return found
    }

    pieceMovement = ( mode, performDash, piece, direction ) => {   
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
        this.locatePieceAt( piece, 0, 0, true )
        this.checkVictoryCondition()
    }

    checkVictoryCondition = () => {
        let different = false
        if ( this.main.pieces.length > 1 ) {
            let piece
            for ( let i = 0; i < this.main.pieces.length - 1; i++ ) {
                piece = this.main.pieces[i]
                if ( piece.color !== this.main.pieces[i+1].color ) {
                    different = true
                    break
                }
            }
        }
        if ( !different ) {
            console.log(this.main.pieces[0].color + ' Wins!' )
            // setTimeout( () => alert( this.main.pieces[0].color + ' Wins!' ), 100 )
            this.main.victory = true
        }
        else this.generateLegalMoves()
    }
}