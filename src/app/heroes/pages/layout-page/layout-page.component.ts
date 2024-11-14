import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.sass'],
})

export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label',  url: './list' },
    { label: 'Añador',  icon: 'add',    url: './new-hero' },
    { label: 'Buscar',  icon: 'search', url: './search' },
  ];

  constructor(
    private authService: AuthService,
  ){};

  get getUser(): User | undefined {
    return this.authService.currentUser;
  };

  onLogout = (): void => {
    this.authService.logout();
  };
}