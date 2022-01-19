/* eslint-disable import/no-absolute-path */
/* eslint-disable node/no-missing-require */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// const { ethers } = require("ethers");
const { ethers } = require('/Users/panaw/Projects/conflux/sdks/ethers.js/packages/ethers');

let url = "http://evmnet.confluxrpc.com/";
// url = 'http://localhost:7545';
// url = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const provider = new ethers.providers.JsonRpcProvider(url);

// const signer = provider.getSigner();   The remote RPC signer
let key = '0x4179f59660cd78e7ecc9dd8a74572932840c1cfd234c9d8e64d50a9e11516d9d';
key = "0x2b45171969ced462642720adbc8d5d3f9b3813576f494deac44729f2482b47ef";
const signer = new ethers.Wallet(key , provider );

async function main() {
  try{
  /* let blockNumber = await provider.getBlockNumber()
  console.log(blockNumber); */

  // console.log(signer.address);
  // await sendTx();
  await deployContract();
} catch(e) {
}

  // const logs = await provider.getLogs({
  //   blockHash: '0x2dff6abfb5ffa24221bf78c6ed9c12855d3d2bd758a28af09901ab9cbb4ac02e'
  // });

  // console.log(logs);

  console.log('success');
}

main().catch(console.log);

async function sendTx() {
  let tx = await signer.sendTransaction({
    from: signer.address,
    to: signer.address,
    value: 100
  });

  console.log(tx.hash);
  await tx.wait();
}

async function deployContract() {
  const GLDMeta = require("../artifacts/contracts/GLD.sol/GLDToken.json");
  // const GLDMeta = require("../artifacts/contracts/Greeter.sol/Greeter.json");
  const cf = new ethers.ContractFactory(GLDMeta.abi, GLDMeta.bytecode, signer);
  const contract = await cf.deploy(100);
  delete contract.deployTransaction.data;
  console.log(contract.deployTransaction)
  await contract.deployTransaction.wait();
}