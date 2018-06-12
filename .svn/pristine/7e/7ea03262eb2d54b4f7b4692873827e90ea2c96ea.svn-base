import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {NotificationService} from '../../core/service/notification.service';
import {Observable} from 'rxjs/Observable';
import {Paginator} from '../model/paginator.model';


interface ListAllInterface<T> {
  getAll(page: string, search?: string): Observable<Paginator<T>>;
}

/**
 * Interface Genérica para lista
 */
export abstract class ListAbstract<T> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  abstract displayedColumns: Array<string>;
  dataSource = new MatTableDataSource<T>();
  resultsLength = 0;
  pageSize = 15;
  pageIndex = 0;
  isLoadingResults = false;

  selection = new SelectionModel<T>(false, []);

  constructor(protected dataService: ListAllInterface<T>,
              protected notificationService: NotificationService) {
  }


  abstract onEdit(data?: T): void;

  abstract onRemove(data?: T): void;

  abstract onAdd(): void;


  ngOnInit() {
    this.paginator.page.subscribe(this.updateDataSource.bind(this));
    this.updateDataSource();
  }

  //busca paginado, somente o resultado daquela página
  updateDataSource(data?: any) {
    const page = data ? data.pageIndex + 1 : 1;
    this.isLoadingResults = true;
    this.selection.clear();
    this.dataService.getAll(page.toString())
      .subscribe((result: any) => {
        this.isLoadingResults = false;
        this.dataSource.data = result;
        this.resultsLength = this.dataSource.data.length*5;
      }, error => {
        this.isLoadingResults = false;
        throw error;
      });
  }

}
