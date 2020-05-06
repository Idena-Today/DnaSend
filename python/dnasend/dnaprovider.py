from abc import ABC, abstractmethod


class DnaProvider(ABC):

    def __init__(self):
        pass

    def __str__(self):
        return type(self).__name__

    @abstractmethod
    def nonce_for_address(self, address: str) -> int:
        pass

    @abstractmethod
    def current_epoch(self) -> int:
        pass

    @abstractmethod
    def send_tx(self, raw_data: str) -> str:
        pass
