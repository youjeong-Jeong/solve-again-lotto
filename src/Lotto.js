import { NUMBER, ERROR } from "./Constants";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#validateDuplicate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== NUMBER.lotto_number_count) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateDuplicate(numberList = '') {
    const list = [...numberList];
    const uniqueValues = [...new Set(list)];
    if (uniqueValues.length !== list.length) {
      throw new Error(ERROR.number);
    }
  }

  getLotto() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
