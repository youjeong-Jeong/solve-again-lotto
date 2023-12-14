import { Random } from "@woowacourse/mission-utils";
import ERROR from "./ERROR";
import InputView from "./InputView";
import OutputView from "./OutputView";
import Lotto from "./Lotto";

class LottoMachine {
  #winningNumber;
  #winningResult;
  #bonus;

  constructor() {
    this.#winningNumber = [];
    this.#winningResult = [0, 0, 0, 0, 0];
  }

  async start() {
    const money = await this.userInputMoney();
    const inputWinningNumber = await this.userInputWinningNumber();
    this.#winningNumber = inputWinningNumber.getLotto();
    this.#bonus = await this.userInputBonus();
    const lottoCount = this.getTicketsCount(money);
    const lottoTickets = this.makeLotto(lottoCount);
    this.compareLottoNumber(lottoTickets);
    const profit = this.calculateProfit();
    const rateOfProfit = this.calculateRateOfProfit(profit, money);
    this.printResult(lottoCount, lottoTickets, rateOfProfit);
  }

  printResult(lottoCount, lottoTickets, rateOfProfit) {
    OutputView.printBuyMessage(lottoCount);
    OutputView.printBuyLotto(lottoTickets);
    OutputView.printWinningResult(this.#winningResult);
    OutputView.printRateOfProfit(rateOfProfit);
  }

  calculateRateOfProfit(profit = 0, money = 0) {
    const result = profit / money * 100;
    return Number(result.toFixed(1));
  }

  calculateProfit() {
    const prize = [2000000000, 30000000, 1500000, 50000, 5000];
    let profit = 0;
    this.#winningResult.forEach( (result, idx) => {
      profit += result * prize[idx];
    })
    return profit;
  }

  compareLottoNumber(lottoTickets = []) {
    lottoTickets.forEach(lotto => {
      const sameNumberCount = this.findSameNumber(this.#winningNumber, lotto.getLotto());
      if (sameNumberCount === 6) {
        this.#winningResult[0] += 1;
      } else if (sameNumberCount === 5) {
        this.#winningResult[2] += 1;
      } else if (sameNumberCount === 4) {
        this.#winningResult[3] += 1;
      } else if (sameNumberCount === 3) {
        this.#winningResult[4] += 1;
      }
    })
  }

  findSameNumber(winningLotto = [], buyLotto = []) {
    const commonElements = winningLotto.filter(element => buyLotto.includes(element));
    if (commonElements.length === 5 && this.checkBonusNumber(buyLotto)) {
      commonElements.length += 2;
      this.#winningResult[1] += 1;
    }
    return commonElements.length;
  }

  checkBonusNumber(lotto) {
    if (lotto.includes(this.#bonus)) {
      return true;
    }
    return false;
  }

  makeLotto(lottoCount = 0) {
    const lottoTickets = [];
    for (let i = 0; i < lottoCount; i += 1) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottoTickets.push(new Lotto(numbers));
    }
    return lottoTickets;
  }

  async userInputBonus() {
    while (true) {
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
        const winningNumber = []
        winningNumberInput.split(',').forEach(number => {
          winningNumber.push(Number(number));
        })
        return new Lotto(winningNumber);
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
