import json
import requests

from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

from .dnaprovider import DnaProvider


class IdenaDevDnaProvider(DnaProvider):

    def __init__(self, url: str = "http://rpc.idena.dev", timeout: int = 5):
        super().__init__()

        self.timeout = timeout
        self.url = url
        self.id = 0

        self.session = requests.Session()
        retries = Retry(total=5, backoff_factor=0.5, status_forcelist=[502, 503, 504])
        self.session.mount('http://', HTTPAdapter(max_retries=retries))

    def request(self, payload: dict) -> dict:
        try:
            # FIXME: Not working
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

    def nonce_for_address(self, address: str) -> int:
        res = self.request({
            "method": "dna_getBalance",
            "params": [address],
            "id": self.id
        })
        return res["nonce"]

    def current_epoch(self) -> int:
        res = self.request({
            "method": "dna_epoch",
            "id": self.id,
        })
        return res["epoch"]

    def send_tx(self, raw_data: str) -> str:
        res = self.request("bcn_sendRawTx", [raw_data])
        return res
