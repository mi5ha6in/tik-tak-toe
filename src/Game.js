export default class Game {
  constructor() {
    this._userMoveSymbol = 'x'
    this._board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  }

  getState() {
    return this._board
  }

  acceptUserMove(x, y) {
    if (this._board[x][y]) {
      throw new Error('cell is already taken')
      return
    }

    this._updateBoard(x, y)
  }

  _updateBoard(x, y) {
    this._board[x][y] = this._userMoveSymbol
  }

  createComputerMove() {
    this._board[0][0] = 'o'
  }
}