import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['id', 'first_name', 'last_name', 'actions'];
  dataSource = new MatTableDataSource<User>();

  resultsLength = 0;
  pageSize = 1;
  pageIndex = 1;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private ns: NotificationService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.paginator.page.subscribe(this.updateDataSource.bind(this));
    this.updateDataSource();
  }

  detail(user: User) {
    this.router.navigate([`user/detail/${user.id}`]);
  }

  updateDataSource(data?: any) {
    const page = data ? data.pageIndex + 1 : 1;
    this.isLoadingResults = true;
    this.userService.get(page)
      .subscribe(_data => {
        this.isLoadingResults = false;
        this.dataSource.data = _data.data;
        this.pageSize = _data.per_page;
        this.resultsLength = _data.total;
        this.pageIndex = _data.page - 1;
      }, error => {
        this.isLoadingResults = false;
        throw error;
      });
  }

}
