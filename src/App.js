import LottoMachine from "./LottoMachine.js";

class App {
  async play() {
    const lottoMachine = new LottoMachine();
    await lottoMachine.start();      
  }
}

export default App;
