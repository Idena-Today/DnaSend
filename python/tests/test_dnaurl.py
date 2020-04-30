import pytest
import sys

sys.path.append('../')
from dnasend import DnaSend
from dnasend.dnaprovider import IdenaDevDnaProvider


def test_create():
    """Can create a DnaSend object"""
    dna_send = DnaSend(provider=IdenaDevDnaProvider())

