from abc import ABC, abstractmethod


class DnaProvider(ABC):

    def __init__(self):
        pass

    @abstractmethod
    def getNonceForAddress(self, address: str) -> int:
        pass

    @abstractmethod
    def getCurrentEpoch(self) -> int:
        pass

    @abstractmethod
    def sendTransaction(self, rawData: str) -> str:
        pass


class IdenaDevDnaProvider(DnaProvider):

    def __init__(self, url: str="rpc.idena.dev"):
        self.url = url
        self.id = 0

    def request(self, command: str, params: list) -> dict:
        # TODO
        pass

    def getNonceForAddress(self, address: str) -> tuple:
        res = self.request("dna_getBalance", [address])
        return res["nonce"], res["balance"]

    def getCurrentEpoch(self) -> dict:
        res = self.request("dna_epoch", [])
        return res

    def sendTransaction(self, rawData: str) -> str:
        res = self.request("bcn_sendRawTx", [rawData])
        return res



