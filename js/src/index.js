const { dnaUrlDecode, dnaUrlEncode } = require('dnaurl/src/dnaurl.js')
const { IdenaDevProvider } = require('./idenaDevProvider.js')

const keccak256 = require("keccak256");  // already a dep of ethereum-hdwallet
const { ecsign } = require('ethereumjs-util');
const RLP = require('rlp');  // already a dep of ethereum-hdwallet


function getProvider(type='', url='') {
    // Only this test provider atm
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


function getCurrentEpoch(provider="") {
    if (provider=="") {
        provider = getProvider()
    }
    const epoch = provider.getCurrentEpoch();
    return epoch
}


function signTransaction(dnaUrl, privateKey) {
    // privateKey as hex
    const transaction = dnaUrlDecode(dnaUrl)
    console.log(transaction)
    if (transaction["status"] == "OK") {
      const rlpData = RLP.encode(transaction["raw"]);
      console.log(rlpData.toString('hex'));
      //expect(rlpData.toString('hex')).toBe("de0129809402bd24ad70c2335f5b3fe47bfce8ed6e39d447cb018227108080")
      const hash = keccak256(rlpData); // Buffer
      console.log(hash.toString('hex'));
      //expect(hash.toString('hex')).toBe("df19875a7f76deb535fc2bce4fc4536270ed9c3a1f422e1c0950234bac7ddcdc")
      const sig2 = ecsign(hash, Buffer.from(privateKey,"hex"))
      const joinedSignature = Buffer.concat([sig2.r, sig2.s, Buffer.from([sig2.v - 27])]);
      console.log(joinedSignature.toString('hex'))
      // expect(joinedSignature.toString('hex')).toBe("df3a8b3ed0801452f051cc8f28cefbe80d6fe7d26a09803ff5b7a3c0d42440a70d5bdb718eb12c627708af81af08607fe01ae63a4732880cf0dbe75175007ce001")
      const sigTransaction = {
        "txid": dnaUrl.split("/").slice(-1), // encoded checksum of tx to sign
        "signature": joinedSignature.toString('hex') // hex
      };
      const sigUrl = dnaUrlEncode(sigTransaction, "sig")
      return sigUrl
    } else {
      return transaction["message"]
    }

}


function sendTransaction(rawDnaUrl, sigDnaUrl, provider) {
    if (provider=="") {
        provider = getProvider()
    }
    const transaction = dnaUrlDecode(rawDnaUrl)
    const sig = dnaUrlDecode(sigDnaUrl)
    console.log(transaction)
    console.log(sig)
    // TODO: make sure checksum of rawDnaUrl matches sigDnaUrl
    joinedSignature = Buffer.from(sig["signature"], 'hex')
    const full = [...transaction["raw"], joinedSignature];
    const rlpResult = RLP.encode(full);
    console.log(rlpResult.toString("hex"))
    const res = provider.sendTransaction('0x'+rlpResult.toString("hex"));
    return res

}




module.exports = {
    getProvider,
    transactionToRawDnaUrl,
    getNonceForAddress,
    getCurrentEpoch,
    signTransaction,
    sendTransaction
}
