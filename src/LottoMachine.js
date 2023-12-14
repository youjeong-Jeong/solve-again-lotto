import { Random } from "@woowacourse/mission-utils";
import InputView from "./InputView";
import OutputView from "./OutputView";
import Lotto from "./Lotto";
import {NUMBER, ERROR}  from "./Constants";

class LottoMachine {
  #winningResult;

  constructor() {
    this.#winningResult = [0, 0, 0, 0, 0];
  }

  async start() {
    const money = await this.userInputMoney();
    const inputWinningNumber = await this.userInputWinningNumber();
    const winningNumber = inputWinningNumber.getLotto();
    const bonus = await this.userInputBonus();
    const lottoCount = this.getTicketsCount(money);
    const lottoTickets = this.makeLotto(lottoCount);
    this.compareLottoNumber(lottoTickets, winningNumber, bonus);
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
    const prize = [NUMBER.first_prize, NUMBER.second_prize, NUMBER.third_prize, NUMBER.fourth_prize, NUMBER.fifth_prize];
    let profit = 0;
    this.#winningResult.forEach((result, idx) => {
      profit += result * prize[idx];
    })
    return profit;
  }

  compareLottoNumber(lottoTickets = [], winningNumber = [], bonus = 0) {
    lottoTickets.forEach(lotto => {
      const sameNumberCount = this.findSameNumber(winningNumber, lotto.getLotto(), bonus);
      if (sameNumberCount === 6) {
        this.#winningResult[NUMBER.first] += 1;
      } else if (sameNumberCount === 5) {
        this.#winningResult[NUMBER.third] += 1;
      } else if (sameNumberCount === 4) {
        this.#winningResult[NUMBER.fourth] += 1;
      } else if (sameNumberCount === 3) {
        this.#winningResult[NUMBER.fifth] += 1;
      }
    })
  }

  findSameNumber(winningLotto = [], buyLotto = [], bonus = 0) {
    const commonElements = winningLotto.filter(element => buyLotto.includes(element));
    if (commonElements.length === 5 && this.checkBonusNumber(buyLotto, bonus)) {
      commonElements.length += 2;
      this.#winningResult[NUMBER.second] += 1;
    }
    return commonElements.length;
  }

  checkBonusNumber(lotto = [], bonus = 0) {
    if (lotto.includes(bonus)) {
      return true;
    }
    return false;
  }

  makeLotto(lottoCount = 0) {
    const lottoTickets = [];
    for (let i = 0; i < lottoCount; i += 1) {
      const numbers = Random.pickUniqueNumbersInRange(NUMBER.start_number, NUMBER.end_number, NUMBER.lotto_number_count);
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
    const bonus = Number(inputBonus);
    if (bonus < NUMBER.start_number || bonus > NUMBER.end_number) {
      throw new Error(ERROR.bonus);
    }
  }

  getTicketsCount(money = 0) {
    return money / NUMBER.ticket_price;
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
    if (number < NUMBER.start_number || number > NUMBER.end_number) {
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
    if (money % NUMBER.ticket_price !== 0) {
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
