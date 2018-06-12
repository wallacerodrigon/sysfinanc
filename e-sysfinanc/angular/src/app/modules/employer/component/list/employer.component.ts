import {Component} from '@angular/core';
import {EmployerService} from '../../service/employer.service';
import {Employer} from '../../interface/employer.interface';
import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';
import * as EmployerConst from '../../constants/employer.constants';
import {ListAbstract} from '../../../../shared/abstract/list.abstract';
import {MatDialog} from '@angular/material';
import {
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_UPDATE,
  SendEventComponent
} from '../../../../shared/components/send-event/send-event.component';
import {Observable} from 'rxjs/Observable';
import {DialogComponent} from '../../../../shared/components/dialog/dialog.component';
 
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent extends ListAbstract<Employer> {

  displayedColumns = ['select', 'name', 'actions'];
  isSendAction: boolean;

  constructor(protected employerService: EmployerService,
              protected notificationService: NotificationService,
              protected dialog: MatDialog,
              protected router: Router) {
    super(employerService, notificationService);

  }

 
  onAdd(): void {
    this.router.navigate(['employer/add']);
  }

  onRemove(employer?: Employer): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        confirmLabel: 'Sim',
        confirmColor: 'primary',
        title: 'Deseja excluir o item?'
      }
    });
    dialogRef.afterClosed().subscribe(action => {
      if (action) {
        employer = employer || this.selection.selected[0];
        this.employerService.delete(employer).subscribe(() => {
          this.notificationService.notify('Item excluido com sucesso');
          this.updateDataSource();
        }, err => {
          this.notificationService.notify('Ocorreu um erro, verifique os campos informados');
        });
      }
    });
  }

  onEdit(employer: Employer): void {
    this.router.navigate([`employer/edit/${employer.id}`]);
  }

  eventDetail(employer: Employer): void {
    this.router.navigate([`event/detail//${employer.event.id}`]);
  }


  getLegalNature(code: string): string {
    let legalNature = EmployerConst.LEGAL_NATURE_OPTIONS
      .find(legalNature => legalNature.value === code);
    return legalNature ? legalNature.label : '';

  }


  onSend(data?: Array<Employer>): void {



    data = data || this.selection.selected;
    const dialogRef = this.dialog.open(SendEventComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(action => {
      if (action) {

        let sendAction: Observable<Employer>;

        if (action === ACTION_CREATE) {
          sendAction = this.employerService.sendCreate(data);
        }
        if (action === ACTION_UPDATE) {
          sendAction = this.employerService.sendUpdate(data);
        }
        if (action === ACTION_DELETE) {
          sendAction = this.employerService.sendDelete(data);
        }
        this.isSendAction = true;
        sendAction.subscribe(() => {
          this.isSendAction = false;
          this.updateDataSource();
          this.notificationService.notify('Operação realizada com sucesso');
        }, () => {
          this.isSendAction = false;
          this.notificationService.notify('Ocorreu um erro, tente novamente mais tarde');
        });
      }
    });

  }
}
