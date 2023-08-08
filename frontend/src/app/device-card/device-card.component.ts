import { Component, Input } from '@angular/core';

import { IPAddress } from '../models/ipaddress';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent {
  @Input() device!: any;

  constructor() {
    const myIp = new IPAddress('192.168.1.108');
    console.log(myIp.toString());
    console.log(myIp.getSubnetIP(24).toString());
    console.log(myIp.getBroadcastIP(24).toString());
  }
}
