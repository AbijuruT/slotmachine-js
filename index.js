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
const depositedAmount = deposit();
console.log(depositedAmount);