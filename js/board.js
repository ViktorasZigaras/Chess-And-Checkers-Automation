"use strict"

const drawBoard = () => {
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
            content += `<div class="column ${ color }" style="width: ${ constants.colWidth }px"> </div>`
        }
        content += `</div>`
    }
    variables.board.innerHTML = content
}

drawBoard()