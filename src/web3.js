import Web3 from "web3";

const provider = new Web3(window.web3);
let web3;

if (provider.currentProvider != null) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = null;
}
console.log(web3);
export default web3;
