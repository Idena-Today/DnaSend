# -*- coding: utf-8 -*-

"""Top-level package for DnaSend."""

from dnasend.dnaprovider import DnaProvider, IdenaDevDnaProvider


__author__ = """Idena.Today"""
__email__ = 'dev@idena.today'
__version__ = '0.0.1'


class DnaSend:

    def __init__(self, provider: DnaProvider=None):
        if provider is None:
            provider = self.getProvider()
        self.provider = DnaProvider

    @classmethod
    def getProvider(cls, type: str='', url: str='') -> DnaProvider:
        # Only this test provider atm
        idenaDev = IdenaDevDnaProvider()
        return idenaDev

    def transactionToRawDnaUrl(self, transaction):
        pass
        # return dnaUrlEncode(transaction, "raw")

    def getNonceForAddress(self, address: str):
        nonce = self.provider.getNonceForAddress(address)
        print ("getNonceForAddress ", nonce)
        return nonce

    def getCurrentEpoch(self):
        epoch = self.provider.getCurrentEpoch()
        return epoch

    def signTransaction(self, dnaUrl: str, privateKey: str):
        # privateKey as hex
        pass
        """
        transaction = dnaUrlDecode(dnaUrl)
        print(transaction)
        if transaction["status"] == "OK":
            rlpData = RLP.encode(transaction["raw"])
            print(rlpData.toString('hex'))
            # expect(rlpData.toString('hex')).toBe("de0129809402bd24ad70c2335f5b3fe47bfce8ed6e39d447cb018227108080")
            hash = keccak256(rlpData)
            print(hash.toString('hex'))
            # expect(hash.toString('hex')).toBe("df19875a7f76deb535fc2bce4fc4536270ed9c3a1f422e1c0950234bac7ddcdc")
            # sig2 = ecsign(hash, Buffer.from(privateKey,"hex"))
            # joinedSignature = Buffer.concat([sig2.r, sig2.s, Buffer.from([sig2.v - 27])]);
            print(joinedSignature.toString('hex'))
            # expect(joinedSignature.toString('hex')).toBe("df3a8b3ed0801452f051cc8f28cefbe80d6fe7d26a09803ff5b7a3c0d42440a70d5bdb718eb12c627708af81af08607fe01ae63a4732880cf0dbe75175007ce001")
            sigTransaction = {
                "txid": dnaUrl.split("/").slice(-1), # encoded checksum of tx to sign
                "signature": joinedSignature.toString('hex') # hex
            }
            # sigUrl = dnaUrlEncode(sigTransaction, "sig")
            return sigUrl
        else:
            return transaction["message"]
        """

    def sendTransaction(self, rawDnaUrl: str, sigDnaUrl: str):
        """
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
        """

