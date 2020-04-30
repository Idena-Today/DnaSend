import pytest
import sys
import rlp
import struct

sys.path.append('../')
from dnasend import DnaSend
from dnasend.dnaprovider import IdenaDevDnaProvider


def int_to_bytes(x: int) -> bytes:
    return x.to_bytes((x.bit_length() + 7) // 8, 'big')


def test_sign():
    """Can create a DnaSend object"""
    raw = [
        0x01,
        int_to_bytes(41),
        int_to_bytes(0),
        bytes.fromhex("02bD24aD70C2335F5B3FE47bfcE8eD6e39D447CB"),
        int_to_bytes(1),
        int_to_bytes(10000),
        0x00, # b"\x00",
        0x00
    ]
    rlp_data = rlp.encode(raw)
    assert rlp_data.hex() == "de0129809402bd24ad70c2335f5b3fe47bfce8ed6e39d447cb018227108080"
    """
      expect(rlpData.toString('hex')).toBe("de0129809402bd24ad70c2335f5b3fe47bfce8ed6e39d447cb018227108080")
      const hash = keccak256(rlpData); // Buffer
      //console.log(hash);
      expect(hash.toString('hex')).toBe("df19875a7f76deb535fc2bce4fc4536270ed9c3a1f422e1c0950234bac7ddcdc")
    """


