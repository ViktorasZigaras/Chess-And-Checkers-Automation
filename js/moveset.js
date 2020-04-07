"use strict"

import * as constants from './variables.js'

export default class MoveSetClass {
    constructor( mainObj ) {
        this.mainObj = mainObj
    }

    generateLegalMovesMeth() {
        this.mainObj.legalMovesWhiteArr = []
        this.mainObj.legalMovesBlackArr = []
        this.mainObj.piecesArr.forEach( ( piece ) => this.generateLegalMovesSpecificMeth( piece ) )
        if ( this.mainObj.legalMovesWhiteArr.length === 0 || 
             this.mainObj.legalMovesBlackArr.length === 0 )
        {
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
        if ( this.pieceMovementValidationMeth( modeStr, dashBool, pieceObj, this.directionNum ) ) 
            this.legalMovesArr.push( 
                Object.assign( 
                    { ...this.moveGeneralObj }, { modeStr: modeStr, dashBool: dashBool } 
                ) 
            )
    }

    pieceMovementValidationMeth( modeStr, dashBool, pieceObj, directionNum ) {
        let moveOkBool = false
        if ( pieceObj.typeStr === 'pawn' ) {
    
            if ( ( directionNum === 1 && pieceObj.yNum + 1 < constants.rowCountNum ) || 
                 ( directionNum === -1 && pieceObj.yNum - 1 >= 0 ) ) 
                moveOkBool = true
    
            if ( moveOkBool && modeStr === 'line' ) {
                moveOkBool = !this.locatePieceAtMeth( pieceObj.xNum, pieceObj.yNum + directionNum )
                if ( dashBool ) {
                    if ( moveOkBool && pieceObj.movesNum === 0 ) {
                        moveOkBool = !this.locatePieceAtMeth( 
                            pieceObj.xNum, pieceObj.yNum + directionNum * 2 )
                    }
                    else moveOkBool = false
                }
            }
            else if ( 
                moveOkBool && (
                    ( modeStr === 'left' && (
                            ( pieceObj.xNum - 1 < 0 ) ||
                            ( pieceObj.xNum - 1 >= 0 && 
                                !this.locatePieceAtMeth( 
                                    pieceObj.xNum - 1, pieceObj.yNum + directionNum ) 
                            )
                        )
                    ) ||
                    ( modeStr === 'right' && (
                            ( pieceObj.xNum + 1 >= constants.colCountNum - 1 ) ||
                            ( pieceObj.xNum + 1 < constants.colCountNum &&
                                !this.locatePieceAtMeth( 
                                    pieceObj.xNum + 1, pieceObj.yNum + directionNum ) 
                            )
                        )
                    )
                )
            ) 
                moveOkBool = false
    
        }
        return moveOkBool
    }

    locatePieceAtMeth( xNum, yNum ) {
        return this.mainObj.coordsArrx2[ xNum ][ yNum ] 
    }

    removePieceMeth( pieceObj ) {
        let otherPieceObj
        for ( let i = 0; i < this.mainObj.piecesArr.length; i++ ) {
            otherPieceObj = this.mainObj.piecesArr[ i ]
            if ( otherPieceObj.idNum !== pieceObj.idNum &&
                 pieceObj.xNum === otherPieceObj.xNum && 
                 pieceObj.yNum === otherPieceObj.yNum ) 
            {
                console.log( 'taken!' )   
                this.mainObj.piecesArr.splice( i, 1 )
                this.mainObj.piecesTakenArr.push( otherPieceObj )    
                document.getElementById( otherPieceObj.idNum ).style.visibility = 'hidden'
                break
            }
        } 
    }

    pieceMovementMeth( modeStr, dashBool, pieceObj, directionNum ) {   
        this.mainObj.coordsArrx2[ pieceObj.xNum ][ pieceObj.yNum ] = false
        if ( pieceObj.typeStr === 'pawn' ) {
    
            if ( modeStr === 'left' ) pieceObj.xNum--
            else if ( modeStr === 'right' ) pieceObj.xNum++
    
            if ( modeStr === 'line' && dashBool && pieceObj.movesNum === 0 ) 
                pieceObj.yNum += directionNum * 2
            else pieceObj.yNum += directionNum
    
        }
        this.mainObj.coordsArrx2[ pieceObj.xNum ][ pieceObj.yNum ] = true
        pieceObj.movesNum++
        const pieceDom = document.getElementById( pieceObj.idNum )
        pieceDom.style.top = pieceObj.yNum * constants.rowHeightNum + 'px'
        pieceDom.style.left = pieceObj.xNum * constants.colWidthNum + 'px'
        this.removePieceMeth( pieceObj )
        this.checkVictoryConditionMeth()
    }

    checkVictoryConditionMeth () {
        let differentBool = false
        if ( this.mainObj.piecesArr.length > 1 ) {
            let pieceObj
            for ( let i = 0; i < this.mainObj.piecesArr.length - 1; i++ ) {
                pieceObj = this.mainObj.piecesArr[ i ]
                if ( pieceObj.colorStr !== this.mainObj.piecesArr[ i+1 ].colorStr ) {
                    differentBool = true
                    break
                }
            }
        }
        if ( !differentBool ) {
            console.log(this.mainObj.piecesArr[ 0 ].colorStr + ' Wins!' )
            // setTimeout( () => alert( this.mainObj.piecesArr[ 0 ].colorStr + ' Wins!' ), 100 )
            this.mainObj.victoryBool = true
        }
        else this.generateLegalMovesMeth()
    }
}