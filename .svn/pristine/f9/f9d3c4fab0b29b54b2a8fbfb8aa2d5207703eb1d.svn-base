import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DashboardService} from './dashboard.service';
import {Event} from './models/event.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  events: Event[];

  constructor(private dashboardService: DashboardService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.dashboardService.events().subscribe(events => this.events = events);
  }

}
