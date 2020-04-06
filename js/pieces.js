"use strict"

import { rowHeightNum, colWidthNum } from './variables.js'

let piecesArr, boardDom

export const setUpPiecesFunc = ( piecesArr_, boardDom_ ) => {   
    piecesArr = piecesArr_
    boardDom = boardDom_
    createPieceFunc( 'pawn' , 0, 0, 'Black', 'Pawn Black-1', 0 )
    createPieceFunc( 'pawn' , 0, 5, 'White', 'Pawn White-1', 1 )

}

const createPieceFunc = ( typeStr, xNum, yNum, colorStr, textStr, idNum ) => {
    let pieceObj = {}
    pieceObj.typeStr = typeStr
    pieceObj.xNum = xNum
    pieceObj.yNum = yNum
    pieceObj.movesNum = 0
    pieceObj.idNum = idNum
    pieceObj.colorStr = colorStr
    piecesArr.push( pieceObj )

    let pieceDom = document.createElement( 'div' )
    pieceDom.id = idNum
    pieceDom.style.top = rowHeightNum * pieceObj.yNum + 'px'
    pieceDom.style.left = colWidthNum * pieceObj.xNum + 'px'
    pieceDom.className = 'piece piece-' + colorStr
    pieceDom.innerHTML = textStr
    boardDom.appendChild( pieceDom )
}