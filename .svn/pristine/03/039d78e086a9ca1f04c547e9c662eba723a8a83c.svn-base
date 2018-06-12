import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {NotificationService} from '../../../../core/service/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  user: User = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      if (data.user) {
        this.user = data.user;
      }
    });
  }


  /**
   * Navega para a lista
   */
  goBack() {
    this.location.back();
  }

}
