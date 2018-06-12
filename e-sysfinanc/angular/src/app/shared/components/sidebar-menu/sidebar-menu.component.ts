import {Component, Input} from '@angular/core';
import {AUTH_METHOD, AUTH_METHOD_ENUM} from '../../../app.constants';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';

declare function require(path: string);

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
})
export class SidebarMenuComponent {

  @Input() system: string;
  @Input() clientName: string;
  @Input() systemVersion: string;
  imageSrc: string = require('../../../../../logo.png');

  navOptions: any = [
    {
      label: 'Dashboard',
      routerLink: ['dashboard'],
      icon: 'dashboard'
    },
    {
      label: 'Cadastros',
      children: [{
        label: 'Rubricas',
        routerLink: ['rubrica'],
        icon: 'subscriptions'
      }]
    },
    {
      label: 'Processamentos',
      children: [{
        label: 'Geração de Lançamentos',
        routerLink: ['lancamento/geracao'],
        icon: 'build'
      },
      {
        label: 'Conciliação de Lançamentos',
        routerLink: ['lancamento/conciliacao'],
        icon: 'assignment'
      }]
    },
    {
      label: 'Consultas',
      children: [{
        label: 'Lançamentos',
        routerLink: ['lancamento'],
        icon: 'search'
      },
      {
        label: 'Mapa Mensal',
        routerLink: ['lancamento/mapa-mensal'],
        icon: 'list'
      }]
    },
    
  ];

  constructor(private router: Router, private authService: AuthService) {
  }

  onLogout(): void {
    this.authService.logout();
  }

  displayLogin(): boolean {
    return true;
  }

}
