import { Console } from "@woowacourse/mission-utils";

const InputView = {
    async readPrice() {
        const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        return input;
    },

    async readWinningNumber() {
        const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
        return input;
    },

    async readBonusNumber() {
        const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
        return input;
    }
    
}

export default InputView;
