import { Component } from '@angular/core';

@Component({
  template: `
  <div class="content">
    <home-component></home-component>
    <router-outlet></router-outlet>
  </div>
  `
})
export class DashboardComponents {

}