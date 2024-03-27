import { Component } from '@angular/core';

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
}