import json
import requests

from abc import ABC, abstractmethod
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


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

    def __init__(self, url: str="rpc.idena.dev", timeout: int=5):
        self.timeout = timeout
        self.url = url
        self.id = 0

        self.session = requests.Session()
        retries = Retry(total=5, backoff_factor=0.5, status_forcelist=[502, 503, 504])
        self.session.mount('http://', HTTPAdapter(max_retries=retries))

    def request(self, payload: dict) -> dict:
        try:
            response = self.session.get(self.url, timeout=self.timeout, json=payload)
            response.raise_for_status()
            content = json.loads(response.content.decode("utf-8"))
            return content["result"]
        except Exception as e:
            # check if json (with error message) is returned
            try:
                content = json.loads(response.content.decode("utf-8"))
                raise ValueError(content)
            # if no json
            except json.decoder.JSONDecodeError:
                pass
            raise

    def getNonceForAddress(self, address: str) -> int:
        res = self.request({
            "method": "dna_getBalance",
            "params": [address],
            "id": self.id
        })
        return res["nonce"]

    def getCurrentEpoch(self) -> int:
        res = self.request({
            "method": "dna_epoch",
            "id": self.id,
        })
        return res["epoch"]

    def sendTransaction(self, rawData: str) -> str:
        res = self.request("bcn_sendRawTx", [rawData])
        return res
