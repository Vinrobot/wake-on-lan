export enum DeviceStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  UNKNOWN = 'Unknown',
}

export interface WOLConfig {
  packetAddress: string;
  packetPort: number;
  macAddress: string;
}

export interface Device {
  name: string;
  status: DeviceStatus;

  ipAddress: string;
  macAddress: string;
}
