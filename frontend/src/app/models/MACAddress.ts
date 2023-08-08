const MAC_SEPARATOR = /[:-]/;
const MAC_HEX = /^[0-9A-Fa-f]{2}$/;

export class MACAddress {
  readonly value: string;

  constructor(value: string) {
    // Split with 7 parts maximum, if 7 or more the address is invalid
    const parts = value.split(MAC_SEPARATOR, 7);
    if (parts.length != 6) {
      throw new Error('MAC address must be composed of 6 hex values');
    }

    for (const part of parts) {
      if (part.length != 2 || !part.match(MAC_HEX)) {
        throw new Error('MAC number must be a valid hex value between 00 and FF');
      }
    }

    this.value = parts.join(':').toUpperCase();
  }

  toString() {
    return this.value;
  }
}
