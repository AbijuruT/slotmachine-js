// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again
// In order to get the user inputs we need to use prompt-sync

const userInputs = require('prompt-sync')();


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

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines)