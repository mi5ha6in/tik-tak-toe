import { expect } from "chai";
import sinon from "sinon";
import Game from "../src/Game";

const computerName = "computer";
const userName = "user";
const userMoveSymbol = "x";
const initialGameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let game;
beforeEach(() => (game = new Game()));

describe("Game", () => {
  it("Should return empty game board", () => {
    const board = game.getState();

    expect(board).to.deep.equal(initialGameBoard);
  });

  it("Write user's symbol in cell with given coordinates", () => {
    const x = 1,
      y = 1;

    game.acceptUserMove(x, y);
    const board = game.getState();

    expect(board[x][y]).to.equal(userMoveSymbol);
  });

  it("Throw an exception if user moves in taken cell", () => {
    const x = 2,
      y = 2;

    game.acceptUserMove(x, y);
    const func = game.acceptUserMove.bind(game, x, y);

    expect(func).to.throw("cell is already taken");
  });

  it("Game saves user's move in history", () => {
    const x = 1,
      y = 1;

    game.acceptUserMove(x, y);
    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });

  it("Game save computers's move in history", () => {
    const stub = sinon.stub(Math, "random").returns(0.5);

    game.createComputerMove();
    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: computerName, x: 1, y: 1 }]);
    stub.restore();
  });

  it("Game save 1 user's move and 1 computer's move in history", () => {
    const x = 1,
      y = 1;

    game.acceptUserMove(x, y);
    game.createComputerMove();
    const history = game.getMoveHistory();

    expect(history.length).to.equal(2);
    expect(history[0].turn).to.equal(userName);
    expect(history[1].turn).to.equal(computerName);
  });

  it("Computer move in randomly chosen cell", () => {
    const userMoveSymbol = "x";
    const computerMoveSymbol = "o";

    const stub = sinon.stub(Math, "random").returns(0.5);

    game.createComputerMove();
    const board = game.getState();

    expect(board[1][1]).to.equal(computerMoveSymbol);
    stub.restore();
  });
});
