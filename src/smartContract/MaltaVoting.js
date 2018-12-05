import web3 from "../web3";
import MaltaInterface from "../smartContract/MaltaInterface.json";

let instance = null;
try {
  instance = new web3.eth.Contract(
    JSON.parse(MaltaInterface),
    "0x91d2eb37a727691b0ec9526394fbe171c1151b97"
  );
} catch (error) {
  instance = null;
  console.log(error);
}

export default instance;
