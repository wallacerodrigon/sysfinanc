import {Component} from '@angular/core';
import {AlertaComponent} from '../../componentes/mensagens/alert.component';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ActivatedRoute, Router } from '@angular/router';
import {UsuarioVO} from '../../dominio/vo/usuario-vo';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomePageComponent {

    private classeHidden: string= 'hidden';

    constructor( public _dialogService: DialogService, public router: Router){
    }
    
    logout(){
        sessionStorage.clear();
        this.router.navigate(['']);
    }

    toggleSubMenu(idSubMenu: string, idMenuIcone?: string){
        var elemento = document.getElementById(idSubMenu);
        var classes = elemento.className.split(' ');
        var getIndex = classes.indexOf(this.classeHidden);
        
        if (getIndex === -1) {
            classes.push(this.classeHidden);
        } else {
            classes.splice(getIndex, this.classeHidden.length);
        }
        elemento.className = classes.join(' ');

        //está visível, trocar para (-). Se está invisível, trocar para (+)
        if (idMenuIcone && getIndex === -1){
            document.getElementById(idMenuIcone).className = 'glyphicon glyphicon-plus-sign';
        } else {
            document.getElementById(idMenuIcone).className = 'glyphicon glyphicon-minus-sign';
        }

    }
}