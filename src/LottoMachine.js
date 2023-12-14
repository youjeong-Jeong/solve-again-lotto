import ERROR from "./ERROR.js";
import InputView from "./InputView.js";
import OutputView from "./OutputView";

class LottoMachine {
  #winningNumber;

  constructor() {
    this.#winningNumber = [];
  }

  async start() {
    const money = await this.userInputMoney();
    this.#winningNumber = await this.userInputWinningNumber();
    const bonusNumber = await this.userInputBonus();
    const lottoTickets = this.getTicketsCount(money);

    //console.log(money);
    //console.log(this.#winningNumber);
    //console.log(bonusNumber);
    //console.log(lottoTickets);
  }

  async userInputBonus() {
    while(true) {
      try {
        const inputBonus = await InputView.readBonusNumber();
        this.validateBonus(inputBonus);
        return Number(inputBonus);
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  validateBonus(inputBonus = '') {
    this.validateIsEmpty(inputBonus);
    this.validateDuplicateBonus(inputBonus);
    const bonus = Number(inputBonus);
    if (bonus < 1 || bonus > 45) {
      throw new Error(ERROR.bonus);
    }
  }

  validateDuplicateBonus(inputBonus = '') {
    if (this.#winningNumber.includes(Number(inputBonus))) {
      throw new Error(ERROR.bonus);
    }
  }

  getTicketsCount(money = 0) {
    return money / 1000;
  }

  async userInputWinningNumber() {
    while (true) {
      try {
        const winningNumberInput = await InputView.readWinningNumber();
        this.validateWinningNumber(winningNumberInput);
        const winningNumber = [];
        winningNumberInput.split(',').forEach(number => {
          winningNumber.push(Number(number));
        })
        return winningNumber;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  validateWinningNumber(winningNumber = '') {
    this.validateIsEmpty(winningNumber);
    this.validateOutOfRange(winningNumber);
  }

  validateOutOfRange(winningNumber = '') {
    const numbers = winningNumber.split(',');
    const numberList = [];
    numbers.forEach(number => {
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
    if (number < 1 || number > 45) {
      throw new Error(ERROR.number);
    }
    return number;
  }

  async userInputMoney() {
    while (true) {
      try {
        const money = await InputView.readPrice();
        this.validateMoney(money);
        return Number(money);
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  validateMoney(money = '') {
    this.validateIsEmpty(money);
    if (money % 1000 !== 0) {
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
