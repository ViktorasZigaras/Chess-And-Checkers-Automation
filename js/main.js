"use strict"

import { setUpPiecesFunc } from './pieces.js'
import * as constants from './variables.js'
import MoveSetClass from './moveset.js'

class ChessGameClass {
    constructor() {
        this.boardDom = document.querySelector( '.board' )
        this.borderDom = null
        this.piecesArr = []
        this.piecesTakenArr = []
        this.legalMovesWhiteArr = []
        this.legalMovesBlackArr = []
        this.coordsArrx2 = null
        this.victoryBool = false
        this.movesObj = null
        this.timerTestObj = null
        this.startButtonDom = null
        this.pauseButtonDom = null
        this.resetButtonDom = null
        this.controlButtonClassesStr = 'button control'
        this.gameIsRunningBool = false

        this.initMeth()
    }
    
    initMeth() {
        this.drawBoardMeth()
        setUpPiecesFunc( this.piecesArr, this.borderDom, this.coordsArrx2 )
        this.movesObj = new MoveSetClass( this )
        this.resetMeth()
    }

    drawBoardMeth() {
        let contentHtml = `
            <div class="buttons">
                <div class="button speed" id="slow">Slow</div>
                <div class="button speed default" id="medium">Medium</div>
                <div class="button speed" id="fast">Fast</div>
                <div class="button control" id="start">Start</div>
                <div class="button control default" id="pause">Pause</div>
                <div class="button control" id="next">Next (0)</div>
                <div class="button control" id="reset">Reset</div>
            </div>
            <div class="border">
        `
        let colorStr = ''
        this.coordsArrx2 = []
        let columnArr
        for ( let x = 0; x < constants.colCountNum; x++ ) {
            contentHtml += `<div class="column">`
            columnArr = []
            for ( let y = 0; y < constants.rowCountNum; y++ ) {
                if ( 
                    ( y % 2 === 1 && x % 2 === 0 ) ||
                    ( y % 2 === 0 && x % 2 === 1 )
                    //( (x + y) % 2 === 0 )
                ) colorStr = 'black'
                else colorStr = 'white'
                contentHtml += 
                    `<div class="cell ${ colorStr }" 
                        style="height: ${ constants.rowHeightNum }px; 
                        width: ${ constants.colWidthNum }px"></div>`
                columnArr.push( false )
            }
            contentHtml += `</div>`
            this.coordsArrx2.push( columnArr )
        }
        contentHtml += `</div>`
        this.boardDom.innerHTML = contentHtml
        this.borderDom = document.querySelector( '.border' )
        this.startButtonDom = document.querySelector( '#start' )
        this.startButtonDom.addEventListener( 'click', () => this.startClickMeth() )
        this.pauseButtonDom = document.querySelector( '#pause' )
        this.pauseButtonDom.addEventListener( 'click', () => this.pauseClickMeth() )
        this.nextButtonDom = document.querySelector( '#next' )
        this.nextButtonDom.addEventListener( 'click', () => this.nextClickMeth() )
        this.resetButtonDom = document.querySelector( '#reset' )
        this.resetButtonDom.addEventListener( 'click', () => this.resetClickMeth() )
        // console.log( this.coordsArrx2 )        
    }

    startClickMeth() {
        if ( !this.victoryBool && !this.gameIsRunningBool ) {
            this.startButtonDom.className = this.controlButtonClassesStr + ' default'
            this.pauseButtonDom.className = this.controlButtonClassesStr
            this.gameIsRunningBool = true
            this.timerTestObj = setInterval( () => this.movementMeth(), 500 )
        }
    }

    pauseClickMeth() {
        if ( this.gameIsRunningBool ) {
            clearInterval( this.timerTestObj )
            this.gameIsRunningBool = false
            this.startButtonDom.className = this.controlButtonClassesStr
            this.pauseButtonDom.className = this.controlButtonClassesStr + ' default'
        }
    }

    nextClickMeth() {
        this.movementMeth()
    }

    resetClickMeth() {
        this.nextButtonDom.innerText = 'Next (0)'
        this.startButtonDom.className = this.controlButtonClassesStr
        this.pauseButtonDom.className = this.controlButtonClassesStr + ' default'
        this.resetMeth()

        //clear coords
        //reposition existing pieces
    }

    //execute after draw move
    //speed controls

    resetMeth() {
        this.movesObj.generateLegalMovesMeth( this )
        this.counterNum = 0
        this.gameIsRunningBool = false
        this.victoryBool = false
        clearInterval( this.timerTestObj )
    }
    
    movementMeth() {
        if ( !this.victoryBool ) {
            this.counterNum++
            this.nextButtonDom.innerText = `Next (${this.counterNum})`
            let legalMovesArr
            if ( this.counterNum % 2 === 1 ) legalMovesArr = this.legalMovesWhiteArr
            else legalMovesArr = this.legalMovesBlackArr
            //
            const moveObj = legalMovesArr[ 
                this.getRngIntegerMeth( 0, legalMovesArr.length - 1 ) 
            ]
            console.log( moveObj, legalMovesArr, this.counterNum )        
            this.movesObj.pieceMovementMeth( 
                moveObj.modeStr, 
                moveObj.dashBool, 
                moveObj.pieceObj, 
                moveObj.directionNum
            )
        }
        else this.pauseClickMeth()
    }
    
    getRngIntegerMeth = ( minNum, maxNum ) => {
        return Math.floor( Math.random() * ( maxNum - minNum + 1 ) ) + minNum
    }
}

new ChessGameClass()

//innerHtml
//innerText
//textContent - ?
// ctrl-d - select all; ctrl+shift+L
//parseInt, etc, parseFloat

// insertAdjacentHtml + before/after - 4 options + html piece
// css: user-select property