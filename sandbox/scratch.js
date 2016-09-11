'use strict';

if (process.argv[2] === 'test') {
  runTests();
} else {
  // the board is empty and it's X's turn
  turn('X                                                                      ');
}

function turn(game) {
  if(weHaveAWinner(game)) {
    reportWin(game);
  } else if (weHaveADraw(game)) {
    reportDraw(game);
  } else {
    doNextMove(game);
  }
}


function weHaveAWinner(game) {
  // TODO: Find out if we have a winner.

  for (const row of getPossibleRows()) {
    const playerAtPosition = checkPosition(game, row[0][0], row[0][1], row[0][2]);
      if (playerAtPosition !== '-' &&
          playerAtPosition === checkPosition(game, row[1][0], row[1][1], row[1][2]) &&
          playerAtPosition === checkPosition(game, row[2][0], row[2][1], row[2][2]) &&
          playerAtPosition === checkPosition(game, row[3][0], row[3][1], row[3][2])) {
          return true;
      }
  }
  return false;
}

function getPossibleRows () {
  const possibleRows = [];

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 4; z++) {
        if (x === 0) {
          possibleRows.push(createRow(0, y, z, 1, 0, 0));
        }

        if (y === 0) {
          possibleRows.push(createRow(x, 0, z, 0, 1, 0));
        }

        if (z === 0) {
          possibleRows.push(createRow(x, y, 0, 0, 0, 1));
        }

        if (x === 0 && y === 0) {
          possibleRows.push(createRow(0, 0, z,  1,  1, 0));
          possibleRows.push(createRow(0, 3, z,  1, -1, 0));
        }

        if (x === 0 && z === 0) {
          possibleRows.push(createRow(0, y, 0,  1, 0,  1));
          possibleRows.push(createRow(0, y, 3,  1, 0, -1));

        }

        if (y === 0 && z === 0) {
          possibleRows.push(createRow(x, 0, 0, 0,  1,  1));
          possibleRows.push(createRow(x, 0, 3, 0,  1, -1));
        }
      }
    }
  }

  possibleRows.push(createRow(0,0,0,  1,  1,  1));
  possibleRows.push(createRow(0,0,3,  1,  1, -1));
  possibleRows.push(createRow(0,3,0,  1, -1,  1));
  possibleRows.push(createRow(3,0,0, -1,  1,  1));


  return possibleRows;

}

function createRow(x, y, z, dx, dy, dz) {
  const row = [];
  for (let i = 0; i < 4; i++) {
    row.push([x + i * dx, y + i * dy, z + i * dz]);
  }
  return row;
}

function checkRow(game, x, y, z, dx, dy, dz) {
  const playerAtPosition = checkPosition(game, x,y,z);
  if (playerAtPosition === '-') return false;
  return playerAtPosition === checkPosition(game, x + dx * 1, y + dy * 1, z + dz * z) &&
         playerAtPosition === checkPosition(game, x + dx * 2, y + dy * 2, z + dz * z) &&
         playerAtPosition === checkPosition(game, x + dx * 3, y + dy * 3, z + dz * z);
}

function checkPosition(game, x, y, z) {
  const OFFSET = 2;
  const index = OFFSET + 1 * x + 4 * y + 16 * z;
  return game[index];
}

function weHaveADraw() {
  // TODO: If someone can still win, return false.
  return true;
}

function reportWin(game) {
  // TODO: Inform both players of the winner.
}

function reportDraw(game) {
  // TODO: Inform both players the game is a draw.
}

function doNextMove(game) {
  // TODO: doNextMove() will ask the next player for a move and add it to the game, then call turn()
}

function stripSpaces(str) {
  return str.replace(/\s+/g, '');
}

function test(expectation, message) {
  if (!expectation) {
    console.log('FAILED: ', message);
  }
}

function expectEqual(expected, actual, message) {
  if (expected !== actual) {
    console.log('FAILED: ', message, `expected "${actual}" to equal "${expected}"`);
  }
}

function runTests() {
  const EMPTY_GAME = stripSpaces('x:' +
  '- - - -   - - - -   - - - -   - - - -' +
  '- - - -   - - - -   - - - -   - - - -' +
  '- - - -   - - - -   - - - -   - - - -' +
  '- - - -   - - - -   - - - -   - - - -');

  test(!weHaveAWinner(EMPTY_GAME), 'We should not have a winner when the game is empty.');


  const X_AXIS_WIN = stripSpaces('x:' +
  'o o o o   - - - -   - - - -   - - - -' +
  '- - - x   - - - -   - - - -   - - - -' +
  '- - - x   - - - -   - - - -   - - - -' +
  '- - - x   - - - x   - - - -   - - - -');

  const Y_AXIS_WIN = stripSpaces('o:' +
  'o o x o   - - x -   - - x -   - - x -' +
  '- - - o   - - - -   - - - -   - - - -' +
  '- - - -   - - - -   - - - -   - - - -' +
  '- - - -   - - - -   - - - -   - - - -');

  const Z_AXIS_WIN = stripSpaces('o:' +
  'o o - o   - - - -   - - - -   x - - -' +
  '- - - o   - - - -   - - - -   x - - -' +
  '- - - -   - - - -   - - - -   x - - -' +
  '- - - -   - - - -   - - - -   x - - -');

  const XZ_WIN = stripSpaces('o:' +
  'o o - o   - - - -   - - - -   x - - -' +
  '- - - o   - - - -   - - - -   - x - -' +
  '- - - -   - - - -   - - - -   - - x -' +
  '- - - -   - - - -   - - - -   - - - x');


  const XYZ_WIN = stripSpaces('o:' +
  'o o - o   - - - -   - - - -   - - - x' +
  '- - - o   - - - -   - - x -   - - - -' +
  '- - - -   - x - -   - - - -   - - - -' +
  'x - - -   - - - -   - - - -   - - - -');



  expectEqual(true, weHaveAWinner(X_AXIS_WIN), 'We should have a winner when o gets four-in-a-row on the x axis.');
  expectEqual(true, weHaveAWinner(Y_AXIS_WIN), 'We should have a winner when x gets four-in-a-row on the y axis.');
  expectEqual(true, weHaveAWinner(Z_AXIS_WIN), 'We should have a winner when x gets four-in-a-row on the z axis.');
  expectEqual(true, weHaveAWinner(XYZ_WIN), 'We should have a winner when x gets four-in-a-row on the xyz diagonal.');



  expectEqual('o', checkPosition(X_AXIS_WIN, 0,0,0), 'Should find o at position 0,0,0');

  // 16 * 3 = 48 straight lines
  // 8 * 3 = 24 diagonal lines
  // 4 3D diagonal lines

}
