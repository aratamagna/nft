import Web3 from 'web3'

import NFTContract from './contracts/NFT.json'

let selectedAcc;

let nftContract;

let isinit = false;

export const init = async () => {
    const providerUrl = 'http://localhost:8545/';

    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      provider
      .request({ method: 'eth_requestAccounts' })
      .then((account) => {
        selectedAcc = account[0];
        console.log('selected account:', account);
      })
      .catch((err) => {
          return;
        console.log(err);
      })
    }

    window.ethereum.on('accountsChanged', function (accounts) {
        selectedAcc = accounts[0];
        console.log('selected account: ', selectedAcc);
    });

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    // nftContract = new web3.eth.Contract(NFTContract.abi, NFTContract.networks[networkId].address);
    nftContract = new web3.eth.Contract(NFTContract.abi, '0x4168DB965532e7Fc57631C282D7BcF85ab598Fb9');

    isinit = true;
}

export const mintToken = async () => {
    if (!isinit) {
        await init();
    }
    return nftContract.methods.mint(selectedAcc).send({ from: selectedAcc });
}