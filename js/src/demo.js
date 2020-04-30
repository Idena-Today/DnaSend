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

const provider = getProvider()
document.querySelector("#get_nonce").addEventListener("click", get_nonce)
document.querySelector("#get_transaction").addEventListener("click", get_transaction)
