export default class Game {
  constructor() {
    this._userName = 'user'
    this._computerName = 'computer'
    this._userMoveSymbol = 'x'
    this._computerMoveSymbol = 'o'
    this._history = []
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
    if (!this._isCellFree(x, y)) {
      return this._throwException('cell is already taken')
    }
    
    this._updateHistory(this._userName, x, y)
    this._updateBoard(x, y)
  }

  _updateBoard(x, y, config={}) {
    const { symbol = this._userMoveSymbol } = config
    this._board[x][y] = symbol
  }

  createComputerMove() {
    this._updateHistory(this._computerName, 0, 0)
    this._updateBoard(0, 0, {
      symbol: this._computerMoveSymbol
    })
  }

  _isCellFree(x, y) {
    return !this._board[x][y]
  }

  _throwException(message) {
    throw new Error(message)
  }

  getMoveHistory() {
    return this._history
  }

  _updateHistory(turn, x, y) {
    this._history.push({turn, x, y})
  }
}