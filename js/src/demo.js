const {
    getProvider,
    transactionToRawDnaUrl,
    getNonceForAddress,
    getCurrentEpoch,
    signTransaction,
    sendTransaction
} = require("./index.js");


async function get_nonce() {
    const address = document.querySelector("#address").value
    // console.log(provider)
    values = await getNonceForAddress(address, provider)
    document.querySelector("#nonce").value = values[0] + 1
}

async function get_epoch() {
    value = await getCurrentEpoch(provider)
    document.querySelector("#epoch").value = value["epoch"]
}


function get_transaction() {
    // test vector tx
    var transaction = {
      "nonce": 1,
      "epoch": 41,
      "type": 0,
      "recipient": "0x02bD24aD70C2335F5B3FE47bfcE8eD6e39D447CB",
      "amount": 1,
      "maxFee": 10000,
      "tips": null,
      "data": "0x"
    }
    // expected dnaurl for that tx, nonce 1 = "dna://raw/1/41/0/0x02bD24aD70C2335F5B3FE47bfcE8eD6e39D447CB/1/10000//4gw/X1xxavvWwXa";
    transaction["nonce"] = parseInt(document.querySelector("#nonce").value)
    transaction["epoch"] = parseInt(document.querySelector("#epoch").value)
    transaction["recipient"] = document.querySelector("#recipient").value
    transaction["amount"] = Math.round(1e18*parseFloat(document.querySelector("#amount").value))
    transaction["maxfee"] = Math.round(1e18*parseFloat(document.querySelector("#maxfee").value))
    transaction["data"] = document.querySelector("#data").value
    console.log(transaction)
    const dnaUrl = transactionToRawDnaUrl(transaction)
    document.querySelector("#rawdnaurl").value = dnaUrl
}

function sign_transaction() {
    // This can be done offline. Take RawDnaUrl, sign with private key (hex format)
    sigdnaurl = signTransaction(document.querySelector("#rawdnaurl").value, document.querySelector("#privkey").value)
    document.querySelector("#sigdnaurl").value = sigdnaurl
}

function send_transaction() {
    res = sendTransaction(document.querySelector("#rawdnaurl").value, document.querySelector("#sigdnaurl").value, provider)
    console.log(res)
    document.querySelector("#send_result").value = res
}

const provider = getProvider()
document.querySelector("#get_nonce").addEventListener("click", get_nonce)
document.querySelector("#get_epoch").addEventListener("click", get_epoch)
document.querySelector("#get_transaction").addEventListener("click", get_transaction)
document.querySelector("#sign_transaction").addEventListener("click", sign_transaction)
document.querySelector("#send_transaction").addEventListener("click", send_transaction)
