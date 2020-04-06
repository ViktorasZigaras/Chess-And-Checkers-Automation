"use strict"

import { setUpPiecesFunc } from './pieces.js'
import * as constants from './variables.js'
import MoveSetClass from './moveset.js'

class ChessGameClass {
    constructor() {
        this.boardDom = document.querySelector( '.board' ) //All
        this.piecesArr = []
        this.piecesTakenArr = []
        this.legalMovesWhiteArr = []
        this.legalMovesBlackArr = []
        this.victoryBool = false
        this.movesObj = null
        this.timerTestObj = null

        this.initMeth()
    }
    
    initMeth() {
        this.drawBoardMeth()
        setUpPiecesFunc( this.piecesArr, this.boardDom )
        this.movesObj = new MoveSetClass( this )
        this.startTimerMeth()
    }

    drawBoardMeth() {
        let contentHtml = ''
        let colorStr = ''
        for ( let y = 0; y < constants.rowCountNum; y++ ) {
            contentHtml += `<div class="row" style="height: ${ constants.rowHeightNum }px">`
            for ( let x = 0; x < constants.colCountNum; x++ ) {
                if ( 
                    ( y % 2 === 1 && x % 2 === 0 ) ||
                    ( y % 2 === 0 && x % 2 === 1 )
                    //( (x + y) % 2 === 0 )
                ) colorStr = 'black'
                else colorStr = 'white'
                contentHtml += `<div class="column ${ colorStr }" 
                    style="width: ${ constants.colWidthNum }px"> </div>`
            }
            contentHtml += `</div>`
        }
        this.boardDom.innerHTML = contentHtml
    }

    startTimerMeth() {
        this.movesObj.generateLegalMovesMeth( this )
        this.counterNum = 0
        this.timerTestObj = setInterval( () => this.movementMeth(), 500 )
    }
    
    movementMeth() {
        if ( !this.victoryBool ) {
            this.counterNum++
            let legalMovesArr
            if ( this.counterNum % 2 === 1 ) legalMovesArr = this.legalMovesWhiteArr
            else legalMovesArr = this.legalMovesBlackArr
            //
            const moveObj = legalMovesArr[ this.getRngIntegerMeth( 0, legalMovesArr.length - 1 ) ]
            console.log( moveObj, legalMovesArr, this.counterNum )        
            this.movesObj.pieceMovementMeth( 
                moveObj.modeStr, 
                moveObj.dashBool, 
                moveObj.pieceObj, 
                moveObj.directionNum
            )
        }
        else clearInterval( this.timerTestObj )
    }
    
    getRngIntegerMeth = ( minNum, maxNum ) => {
        return Math.floor( Math.random() * ( maxNum - minNum + 1 ) ) + minNum
    }
}

// const gameObj = new ChessGameClass()
// console.log( gameObj ) 
// console.log( new ChessGameClass() ) 
new ChessGameClass()

//innerHtml
//innerText
//textContent - ?
// ctrl-d - select all; ctrl+shift+L
//parseInt, etc, parseFloat

// insertAdjacentHtml + before/after - 4 options + html piece
// css: user-select property