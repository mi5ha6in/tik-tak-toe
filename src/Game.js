export default class Game {
  constructor() {
    this._userName = 'user'
    this._computerName = 'computer'
    this._userMoveSymbol = 'x'
    this._computerMoveSymbol = 'o'
    this._fieldSize = 3
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
    const x = this._getRandomCoordinate()
    const y = this._getRandomCoordinate()
    this._updateHistory(this._computerName, x, y)
    this._updateBoard(x, y, {
      symbol: this._computerMoveSymbol
    })

  }

  _getRandomCoordinate() {
    return Math.floor(Math.random() * (this._fieldSize -  0))
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