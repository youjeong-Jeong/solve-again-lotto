import LottoMachine from "./LottoMachine";

class App {
  async play() {
    const lottoMachine = new LottoMachine();
    await lottoMachine.start();      
  }
}

export default App;
