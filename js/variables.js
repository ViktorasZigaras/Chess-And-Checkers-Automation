"use strict"

const constants = {}
constants.rowCount = 8
constants.colCount = 8
constants.rowHeight = 75
constants.colWidth = 75

const variables = {}
variables.board = document.querySelector( '.board' ) //All
variables.pieces = []
variables.piecesTaken = []
variables.victory = false

const timers = {}
// timers.timerDown
// timers.timerUp