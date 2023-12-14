import { Console } from "@woowacourse/mission-utils";

const OutputView = {
    printBuyMessage(count) {
        Console.print(`${count}개를 구매했습니다.`);
    },

    printBuyLotto(lottoTickets) {
        lottoTickets.forEach(lotto => {
            Console.print(`[${lotto.getLotto().join(', ')}]`);
        });
    },

    printWinningResult(winningResult) {
        Console.print('당첨 통계');
        Console.print('---');
        Console.print(`3개 일치 (5,000원) - ${winningResult[4]}개`);
        Console.print(`4개 일치 (50,000원) - ${winningResult[3]}개`);
        Console.print(`5개 일치 (1,500,000원) - ${winningResult[2]}개`);
        Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult[1]}개`);
        Console.print(`6개 일치 (2,000,000,000원) - ${winningResult[0]}개`);
    },

    printRateOfProfit(rangeOfProfit) {
        Console.print(`총 수익률은 ${rangeOfProfit}%입니다.`)
    },

    printError(error) {
        Console.print(error.message);
    },
}

export default OutputView;
