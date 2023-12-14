import ERROR from "./ERROR.js";
import InputView from "./InputView.js";
//import OutputView from "./OutputView";

class LottoMachine {
  constructor() {}

  async start() {
    const money = await this.userInputMoney();
    const winningNumber = await this.userInputWinningNumber();
    const lottoTickets = this.getTicketsCount(money);
    
    console.log(money);
    console.log(winningNumber);
    console.log(lottoTickets);
  }

  getTicketsCount(money = 0) {
    return money / 1000;
  }

  async userInputWinningNumber() {
    const winningNumberInput = await InputView.readWinningNumber();
    this.validateWinningNumber(winningNumberInput);
    const winningNumber = [];
    winningNumberInput.split(',').forEach( number => {
      winningNumber.push(Number(number));
    })
    return winningNumber;
  }

  validateWinningNumber(winningNumber = '') {
    this.validateIsEmpty(winningNumber);
    this.validateOutOfRange(winningNumber);
  }

  validateOutOfRange(winningNumber = '') {
    const numbers = winningNumber.split(',');
    const numberList = [];
    numbers.forEach( number => {
      numberList.push(this.validateNumber(number));
    })
    this.validateDuplicate(numberList);
  }

  validateDuplicate(numberList = '') {
    const list = [...numberList];
    const uniqueValues = [...new Set(list)];
    if (uniqueValues.length !== list.length) {
      throw new Error(ERROR.number);
    }
  }

  validateNumber(input = '') {
    const number = Number(input);
    if(number < 1 || number > 45) {
      throw new Error(ERROR.number);
    }
    return number;
  }

  async userInputMoney() {
    const money = await InputView.readPrice();
    this.validateMoney(money);
    return Number(money);
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
