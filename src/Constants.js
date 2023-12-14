const NUMBER = Object.freeze({
  first_prize: 2000000000,
  second_prize: 30000000,
  third_prize: 1500000,
  fourth_prize: 50000,
  fifth_prize: 5000,
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  start_number: 1,
  end_number: 45,
  ticket_price: 1000,
  lotto_number_count: 6,
})

const ERROR = Object.freeze({
  empty: '[ERROR] 공백입력.',
  money: '[ERROR] 숫자가 잘못된 형식입니다.',
  number: '[ERROR] 잘못된 당첨번호 입력입니다.',
  bonus: '[ERROR] 잘못된 보너스 번호 입력입니다.',
})

const MESSAGE = Object.freeze({
  buy: '개를 구매했습니다.',
  statistics: '당첨 통계',
  line: '---',
  match_three: '3개 일치 (5,000원) - ',
  match_four: '4개 일치 (50,000원) - ',
  match_five: '5개 일치 (1,500,000원) - ',
  match_five_bonus: '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
  match_six: '6개 일치 (2,000,000,000원) - ',
  amount: '개',
  start_range_of_profit: '총 수익률은 ',
  end_range_of_profit: '%입니다.',
})



export { NUMBER, ERROR, MESSAGE };
