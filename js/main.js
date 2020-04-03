"use strict"

import { setUpPieces } from './pieces.js'
import * as constants from './variables.js'
import MoveSet from './moveset.js'

class ChessGame {
    constructor() {
        this.board = document.querySelector( '.board' ) //All
        this.pieces = []
        this.piecesTaken = []
        this.legalMoves = []
        this.victory = false
        this.timerTest = []
        this.moves = null
        this.init()
    }
    
    init() {
        this.drawBoard()
        setUpPieces( this.pieces, this.board )
        this.moves = new MoveSet( this )
        this.startTimer()
    }

    drawBoard = () => {
        let content = ''
        let color = ''
        for ( let y = 0; y < constants.rowCount; y++ ) {
            content += `<div class="row" style="height: ${ constants.rowHeight }px">`
            for ( let x = 0; x < constants.colCount; x++ ) {
                if ( 
                    ( y % 2 === 1 && x % 2 === 0 ) ||
                    ( y % 2 === 0 && x % 2 === 1 )
                    //( (x + y) % 2 === 0 )
                ) color = 'black'
                else color = 'white'
                content += `<div class="column ${ color }" 
                    style="width: ${ constants.colWidth }px"> </div>`
            }
            content += `</div>`
        }
        this.board.innerHTML = content
    }

    startTimer = () => {
        this.moves.generateLegalMoves( this )
    
        this.timerTest = setInterval( 
            () => this.testMovement(), 500 
        )
    }
    
    testMovement = () => {
        if ( !this.victory ) {
            const move = this.legalMoves[ 
                this.getRngInteger( 0, this.legalMoves.length - 1 ) ]
            console.log( move, this.legalMoves )        
            this.moves.pieceMovement( 
                move.mode, 
                move.dash, 
                move.piece, 
                move.direction 
            )
        }
        else clearInterval( this.timerTest )
    }
    
    getRngInteger = ( min, max ) => {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min
    }
}

const game = new ChessGame()

//innerHtml
//innerText
//textContent - ?
// ctrl-d - select all; ctrl+shift+L
//parseInt, etc, parseFloat