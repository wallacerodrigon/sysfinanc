import { Component, OnInit } from '@angular/core';
import { RubricaService } from '../../service/rubrica.service';
import { NotificationService } from '../../../../core/service/notification.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Rubrica } from '../../model/rubrica.class';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { ListAbstract } from '../../../../shared/abstract/list.abstract';

@Component({
  selector: 'app-rubrica-list',
  templateUrl: './rubrica-list.component.html',
  styleUrls: ['./rubrica-list.component.css']
})
export class RubricaListComponent  extends ListAbstract<Rubrica> {

  displayedColumns = ['descricao', 'descTipoConta', 'despesa', 'dataCadastroStr', 'actions'];

  constructor(protected rubricaService: RubricaService,
                protected notificationService: NotificationService,
                protected dialog: MatDialog,
                protected router: Router) {
      super(rubricaService, notificationService);
  
    }

  onAdd(): void {
    this.router.navigate(['rubrica/add']);
  }

  onRemove(rubrica?: Rubrica): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        confirmLabel: 'Sim',
        confirmColor: 'primary',
        title: 'Deseja realmente excluir o registro?'
      }
    });
    dialogRef.afterClosed().subscribe(action => {
      if (action) {
        rubrica = rubrica || this.selection.selected[0];
        this.rubricaService.delete(rubrica).subscribe(() => {
          this.notificationService.notify('Item excluido com sucesso');
          this.updateDataSource();
        }, err => {
          this.notificationService.notify('Ocorreu um erro, verifique os campos informados');
        });
        this.notificationService.notify('Registro excluído');
      }
    });
  }

  onEdit(rubrica: Rubrica): void {
    this.router.navigate([`rubrica/edit/${rubrica.id}`]);
  }
  

}
