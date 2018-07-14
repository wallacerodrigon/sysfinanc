import {Component} from '@angular/core';
import {AlertaComponent} from '../../componentes/mensagens/alert.component';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ActivatedRoute, Router } from '@angular/router';
import {UsuarioVO} from '../../dominio/vo/usuario-vo';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomePageComponent {

    constructor( public _dialogService: DialogService, public router: Router){
    }
    
    logout(){
        sessionStorage.clear();
        this.router.navigate(['']);
    }
}