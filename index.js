// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again
// In order to get the user inputs we need to use prompt-sync

const userInputs = require('prompt-sync')();
const rows = 3;
const cols = 3;
const symbolsCount = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const symbolValues = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};


const deposit = () => {
  while (true) {
    const depositAmount = userInputs('Enter a deposit amount: ');
    const numberDepositAmount = parseFloat(depositAmount);

    //Che if the number is valid
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log('Invalid deposit amount, try again.');
    } else {
      return numberDepositAmount;
    }
  }
}

const getNumberOfLines = () => {
  while (true) {
    const lines = userInputs('Enter the number of lines to bet on (1-3): ');
    const numberOfLines = parseFloat(lines);

    //Che if the number is valid
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log('Invalid number of lines, try again.');
    } else {
      return numberOfLines;
    }
  }
}

const getBet = (balance, lines) => {
  while (true) {
    const bet = userInputs('Enter the total bet per line: ');
    const numberOfBet = parseFloat(bet);

    //Che if the number is valid
    if (isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance / lines) {
      console.log('Invalid bet, try again.');
    } else {
      return numberOfBet;
    }
  }
}

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(symbolsCount)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < cols; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]
    for (let j = 0; j < rows; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels
};

const transpose = (reels) => {
  const transposedRows = [];
  for (let i = 0; i < rows; i++) {
    transposedRows.push([]);
    for (let j = 0; j < cols; j++) {
      transposedRows[i].push(reels[j][i]);
    }
  }
  return transposedRows;
}
const printSlot = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | "
      }
    }
    console.log(rowString)
  }
}
getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * symbolValues[symbols[0]]
    }

  }
  return winnings;
};
const game = () => {
  let balance = deposit();
  while (true) {
    console.log(`You have a balance of $${balance}`);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;

    const reels = spin()
    const rowsBlock = transpose(reels);
    printSlot(rowsBlock);
    const winnings = getWinnings(rowsBlock, bet, numberOfLines)
    balance += winnings;
    console.log(`You won, $${winnings.toString()}`);
    if (balance <= 0) {
      console.log("You ran out of money");
      break;
    }
    const playAgain = userInputs("Do you want to play again (y/n)?");
    if (playAgain != "y") break;
  }
}
game();