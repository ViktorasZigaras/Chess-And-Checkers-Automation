"use strict"

import * as constants from './variables.js'

export default class MoveSetClass {
    constructor( mainObj ) {
        this.mainObj = mainObj
    }

    generateLegalMovesMeth() {
        this.mainObj.legalMovesWhiteArr = []
        this.mainObj.legalMovesBlackArr = []
        for ( let i = 0; i < this.mainObj.piecesArr.length; i++ ) {
            this.generateLegalMovesSpecificMeth( this.mainObj.piecesArr[i] )
        }
        if ( this.mainObj.legalMovesWhiteArr.length === 0 || this.mainObj.legalMovesBlackArr.length === 0 ) {
            console.log( 'Draw!' )
            // setTimeout( () => alert( 'Draw!' ), 100 )
            this.mainObj.victoryBool = true
        }
    }

    generateLegalMovesSpecificMeth( pieceObj ) {
        if ( pieceObj.typeStr === 'pawn' ) {
            if ( pieceObj.colorStr === 'Black' ) {
                this.legalMovesArr = this.mainObj.legalMovesBlackArr
                this.directionNum = 1
            }
            else if ( pieceObj.colorStr === 'White' ) {
                this.legalMovesArr = this.mainObj.legalMovesWhiteArr
                this.directionNum = -1
            }
            this.moveGeneralObj = { 
                infoStr: pieceObj.colorStr + ' ' + pieceObj.typeStr + '-' + pieceObj.idNum, 
                pieceObj: pieceObj, 
                directionNum: this.directionNum 
            }
            this.checkMoveMeth( 'line', true, pieceObj )
            this.checkMoveMeth( 'line', false, pieceObj )
            this.checkMoveMeth( 'left', null, pieceObj )
            this.checkMoveMeth( 'right', null, pieceObj )
        }
    }

    checkMoveMeth( modeStr, dashBool, pieceObj ) {
        if ( 
            this.pieceMovementValidationMeth( modeStr, dashBool, pieceObj, this.directionNum ) 
        ) 
        {
            // let moveDetailsObj = { ...this.moveGeneralObj }
            // moveDetailsObj.modeStr = modeStr
            // moveDetailsObj.dashBool = dashBool
            // legalMovesArr.push( moveDetailsObj )
            this.legalMovesArr.push( 
                Object.assign( { ...this.moveGeneralObj }, 
                    { modeStr: modeStr, dashBool: dashBool } 
                ) 
            )
        }
    }

    pieceMovementValidationMeth( modeStr, dashBool, pieceObj, directionNum ) {
        let moveOkBool = false
        if ( pieceObj.typeStr === 'pawn' ) {
    
            if ( 
                ( directionNum === 1 && pieceObj.yNum + 1 < constants.rowCountNum ) || 
                ( directionNum === -1 && pieceObj.yNum - 1 >= 0 ) 
            ) 
                moveOkBool = true
    
            if ( moveOkBool && modeStr === 'line' ) {
                moveOkBool = !this.locatePieceAtMeth( pieceObj, 0, directionNum, false )
                if ( dashBool ) {
                    if ( moveOkBool && pieceObj.movesNum === 0 ) {
                        moveOkBool = 
                            !this.locatePieceAtMeth( pieceObj, 0, directionNum * 2, false )
                    }
                    else moveOkBool = false
                }
            }
            else if ( 
                moveOkBool && (
                    ( modeStr === 'left' && (
                            ( pieceObj.xNum - 1 < 0 ) ||
                            ( !this.locatePieceAtMeth( pieceObj, -1, directionNum, false ) )
                        )
                    ) ||
                    ( modeStr === 'right' && (
                            ( pieceObj.xNum + 1 >= constants.colCountNum - 1 ) ||
                            ( !this.locatePieceAtMeth( pieceObj, 1, directionNum, false ) )
                        )
                    )
                )
            ) 
                moveOkBool = false
    
        }
        return moveOkBool
    }

    locatePieceAtMeth ( pieceObj, xOffsetNum, yOffsetNum, takePieceBool ) {
        let foundBool = false
        let otherPieceObj
        for ( let i = 0; i < this.mainObj.piecesArr.length; i++ ) {
            otherPieceObj = this.mainObj.piecesArr[i]
            if ( otherPieceObj.idNum !== pieceObj.idNum 
                && pieceObj.xNum  + xOffsetNum === otherPieceObj.xNum  
                && pieceObj.yNum  + yOffsetNum === otherPieceObj.yNum  ) 
            {
                foundBool = true
                if ( takePieceBool ) {
                    console.log( 'taken!' )   
                    this.mainObj.piecesArr.splice( i, 1 )
                    this.mainObj.piecesTakenArr.push( otherPieceObj )    
                    document.getElementById( otherPieceObj.idNum ).style.visibility = 'hidden'
                }
                break
            }
        }  
        return foundBool
    }

    pieceMovementMeth( modeStr, dashBool, pieceObj, directionNum ) {   
        if ( pieceObj.typeStr === 'pawn' ) {
    
            if ( modeStr === 'left' ) pieceObj.xNum--
            else if ( modeStr === 'right' ) pieceObj.xNum++
    
            if ( modeStr === 'line' 
                && dashBool 
                && pieceObj.movesNum === 0 ) pieceObj.yNum += directionNum * 2
            else pieceObj.yNum += directionNum
    
        }
        pieceObj.movesNum++
        const pieceDom = document.getElementById( pieceObj.idNum )
        pieceDom.style.top = pieceObj.yNum * constants.rowHeightNum + 'px'
        pieceDom.style.left = pieceObj.xNum * constants.colWidthNum + 'px'
        this.locatePieceAtMeth( pieceObj, 0, 0, true )
        this.checkVictoryConditionMeth()
    }

    checkVictoryConditionMeth () {
        let differentBool = false
        if ( this.mainObj.piecesArr.length > 1 ) {
            let pieceObj
            for ( let i = 0; i < this.mainObj.piecesArr.length - 1; i++ ) {
                pieceObj = this.mainObj.piecesArr[i]
                if ( pieceObj.colorStr !== this.mainObj.piecesArr[i+1].colorStr ) {
                    differentBool = true
                    break
                }
            }
        }
        if ( !differentBool ) {
            console.log(this.mainObj.piecesArr[0].colorStr + ' Wins!' )
            // setTimeout( () => alert( this.mainObj.piecesArr[0].colorStr + ' Wins!' ), 100 )
            this.mainObj.victoryBool = true
        }
        else this.generateLegalMovesMeth()
    }
}