import ERROR from "./ERROR.js";
import InputView from "./InputView.js";
//import OutputView from "./OutputView";

class LottoMachine {
  constructor() {}

  async start() {
    const money = await this.userInputMoney();
    const winningNumber = await this.userInputWinningNumber();
    const lottoTickets = 
  }

  async userInputWinningNumber() {
    const winningNumber = await InputView.readWinningNumber();
    this.validateWinningNumber(winningNumber);
  }

  validateWinningNumber(winningNumber = '') {
    this.validateIsEmpty(winningNumber);
    this.validateOutOfRange(winningNumber);
  }

  validateOutOfRange(winningNumber = '') {
    const numbers = winningNumber.split(',');
    numbers.forEach( number => {
      this.validateNumber(number);
    })
    this.validateDuplicate(numbers);
  }

  validateNumber(input = '') {
    const number = Number(input);
    if(number < 1 || number > 45) {
      throw new Error(ERROR.number);
    }
  }

  async userInputMoney() {
    const money = await InputView.readPrice();
    this.validateMoney(money);
    return money;
    /*
    while (true) {
      try {
        const money = await InputView.readPrice();
        this.validateMoney(money);
      } catch (error) {
        OutputView.printError(error);
      }
    }
    */
  }

  validateMoney(money = '') {
    this.validateIsEmpty(money);
    if(money % 1000 !== 0 ) {
      throw new Error(ERROR.money);
    }
  }

  validateIsEmpty(input = '') {
    if (!input.trim()) {
      throw new Error(ERROR.empty);
    }
  }
}

export default LottoMachine;
