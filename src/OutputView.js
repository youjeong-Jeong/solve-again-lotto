import { Console } from "@woowacourse/mission-utils";
import { NUMBER, MESSAGE } from "./Constants";

const OutputView = {
    printBuyMessage(count) {
        Console.print(`${count}${MESSAGE.buy}`);
    },

    printBuyLotto(lottoTickets) {
        lottoTickets.forEach(lotto => {
            Console.print(`[${lotto.getLotto().join(', ')}]`);
        });
    },

    printWinningResult(winningResult) {
        Console.print(MESSAGE.statistics);
        Console.print(MESSAGE.line);
        Console.print(`${MESSAGE.match_three}${winningResult[NUMBER.fifth]}${MESSAGE.amount}`);
        Console.print(`${MESSAGE.match_four}${winningResult[NUMBER.fourth]}${MESSAGE.amount}`);
        Console.print(`${MESSAGE.match_five}${winningResult[NUMBER.third]}${MESSAGE.amount}`);
        Console.print(`${MESSAGE.match_five_bonus}${winningResult[NUMBER.second]}${MESSAGE.amount}`);
        Console.print(`${MESSAGE.match_six}${winningResult[NUMBER.first]}${MESSAGE.amount}`);
    },

    printRateOfProfit(rangeOfProfit) {
        Console.print(`${MESSAGE.start_range_of_profit}${rangeOfProfit}${MESSAGE.end_range_of_profit}`)
    },

    printError(error) {
        Console.print(error.message);
    },
}

export default OutputView;
