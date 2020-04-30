/* A provider relying on idena.dev rpc server */
var request = require('request-promise')

class IdenaDevProvider {
    constructor() {
        this.id=0
        this.url = "https://rpc.idena.dev"
    }

     request(method, params) {
        // adapted from https://github.com/idena-dev/idena-js/blob/master/src/providers/LocalKeyStore.ts
        this.id += 1
        return request({
            url: this.url,
            json: {
                id: this.id,
                method,
                params
            },
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        }).then(r => {
            if (!r) {
                throw Error(`${method} could be blacklisted`)
            }
            if (r && r.error && r.error.message)
                throw Error(r.error.message);
            if (!r.result)
                throw Error("unknown error");
            return r.result;
        });
    }

    async getNonceForAddress(address) {
        const { balance, stake, nonce } = await this.request("dna_getBalance", [address]);
        console.log(nonce)
        console.log(balance)
        return [nonce, balance]
    }

    async getCurrentEpoch() {
        const epoch = await this.request("dna_epoch", []);
        console.log(epoch)
        return epoch
    }

    async sendTransaction(rawData) {
        const result = await this.request("bcn_sendRawTx", [rawData]);
        console.log(result)
        return result
    }

}


module.exports = {
    IdenaDevProvider
}
