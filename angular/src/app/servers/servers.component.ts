import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  template: `
    Inside the Servers component,
    <app-server></app-server>
    <app-server></app-server>
  `,
  styles: [`
    app-server {
      color: royalblue;
    }
  `]
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
