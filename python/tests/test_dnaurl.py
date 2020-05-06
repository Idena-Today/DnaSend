import pytest
import sys

sys.path.append('../')
from dnasend import DnaSend
from dnasend.idenadevdnaprovider import IdenaDevDnaProvider


def test_create():
    """Can create a DnaSend object"""
    dna_send = DnaSend(provider=IdenaDevDnaProvider())
    print("Epoch:", dna_send.current_epoch())


# TODO: Remove after testing
if __name__ == "__main__":
    test_create()
