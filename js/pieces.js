"use strict"

import { rowHeightNum, colWidthNum } from './variables.js'

let piecesArr, borderDom, coordsArrx2

export const setUpPiecesFunc = ( piecesArr_, borderDom_, coordsArrx2_ ) => {   
    piecesArr = piecesArr_
    borderDom = borderDom_
    coordsArrx2 = coordsArrx2_
    createPieceFunc( 'pawn' , 0, 0, 'Black', 'Pawn Black-1', 0 )
    createPieceFunc( 'pawn' , 1, 7, 'White', 'Pawn White-1', 1 )
}

const createPieceFunc = ( typeStr, xNum, yNum, colorStr, textStr, idNum ) => {
    let pieceObj = { 
        typeStr: typeStr, 
        xNum: xNum, 
        yNum: yNum, 
        movesNum: 0, 
        idNum: idNum,
        colorStr: colorStr
    }
    piecesArr.push( pieceObj )

    coordsArrx2[ xNum ][ yNum ] = true

    let pieceDom = document.createElement( 'div' )
    pieceDom.id = idNum
    pieceDom.style.top = rowHeightNum * pieceObj.yNum + 'px'
    pieceDom.style.left = colWidthNum * pieceObj.xNum + 'px'
    pieceDom.className = 'piece piece-' + colorStr
    pieceDom.innerHTML = textStr
    borderDom.appendChild( pieceDom )
}