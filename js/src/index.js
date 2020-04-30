const { dnaUrlDecode, dnaUrlEncode } = require('dnaurl/src/dnaurl.js')
const { IdenaDevProvider } = require('./idenaDevProvider.js')


function getProvider(type='', url='') {
    const idenaDev = new IdenaDevProvider()
    return idenaDev
}

function transactionToRawDnaUrl(transaction) {
    return dnaUrlEncode(transaction, "raw");
}


function getNonceForAddress(address, provider="") {
    if (provider=="") {
        provider = getProvider()
    }
    const nonce = provider.getNonceForAddress(address);
    //console.log("getNonceForAddress " + nonce)
    return nonce
}


function getCurrentEpoch() {
    return 43;
}


function signTransaction() {
}


function sendTransaction() {
}




module.exports = {
    getProvider,
    transactionToRawDnaUrl,
    getNonceForAddress,
    getCurrentEpoch,
    signTransaction,
    sendTransaction
}
