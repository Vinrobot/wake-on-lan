import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-device-grid',
  templateUrl: './device-grid.component.html',
  styleUrls: ['./device-grid.component.scss']
})
export class DeviceGridComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Small).pipe(
    map(({ matches }) => {
      console.log('ALOO', matches);
      if (matches) {
        return [
          { title: 'Device 1', cols: 1, rows: 1 },
          { title: 'Device 2', cols: 1, rows: 1 },
          { title: 'Device 3', cols: 1, rows: 1 },
          { title: 'Device 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Device 1', cols: 2, rows: 1 },
        { title: 'Device 2', cols: 1, rows: 1 },
        { title: 'Device 3', cols: 1, rows: 2 },
        { title: 'Device 4', cols: 1, rows: 1 }
      ];
    })
  );
}
