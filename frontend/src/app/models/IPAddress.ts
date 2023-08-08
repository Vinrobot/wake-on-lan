export const IPV4_MIN = 0;
export const IPV4_MAX = 4294967295;

function isBetween(low: number, value: number, high: number) {
  return !isNaN(value) && isFinite(value) && low <= value && value <= high;
}

export type IPv4Primitive = number | [number, number, number, number] | string;

export function ip2long(ip: number[]) {
  if (ip.length != 4) {
    throw new Error('IPv4 address must contains 4 numbers');
  }

  let long = 0;
  for (let i = 0; i < 4; ++i) {
    const value = ip[i];

    if (!isBetween(0, value, 255)) {
      throw new Error(`IP address number must be a valid number between 0 and 255 (given ${value})`);
    }

    long = long << 8 | (value & 255);
  }

  long = long >>> 0;

  if (!isBetween(IPV4_MIN, long, IPV4_MAX)) {
    // Should never happen as each parts are validated
    throw new Error('IP address numbers must be a valid number between 0 and 255');
  }

  return long;
}

export class IPAddress {
  readonly value: number;

  constructor(ip: IPv4Primitive) {
    if (typeof ip === 'number') {
      if (!isBetween(IPV4_MIN, ip, IPV4_MAX)) {
        throw new Error('IP address value must be between 0 and 4294967295');
      }
      this.value = ip;
    } else if (Array.isArray(ip)) {
      this.value = ip2long(ip);
    } else if (typeof ip === 'string') {
      this.value = ip2long(ip.split('.').map(value => parseInt(value, 10)));
    } else {
      throw new Error(`Unknown IP value type (${typeof ip})`);
    }
  }

  toLong(): number {
    return this.value;
  }

  toBytes(): [number, number, number, number] {
    const value = this.value;
    return [
      (value >>> 24) & 255,
      (value >>> 16) & 255,
      (value >>> 8) & 255,
      value & 255,
    ]
  }

  toString() {
    return this.toBytes().join('.');
  }

  getSubnetIP(maskSize: number) {
    if (!isBetween(0, maskSize, 32)) {
      throw new Error(`Mask must be between 0 and 32 (${maskSize})`);
    }

    maskSize = 32 - maskSize;
    return new IPAddress(((this.value >>> maskSize) << maskSize) >>> 0);
  }

  getBroadcastIP(maskSize: number) {
    if (!isBetween(0, maskSize, 32)) {
      throw new Error(`Mask must be between 0 and 32 (${maskSize})`);
    }

    const mask = IPV4_MAX >>> maskSize;
    return new IPAddress((this.value | mask) >>> 0);
  }
}
