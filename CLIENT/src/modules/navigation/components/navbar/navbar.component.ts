import { Component } from '@angular/core';

interface Nav {
  link: string;
  name: string;
  exact: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class TodNavbarComponent {
  nav: Nav[] = [
    {
      link: '/home/product-manager',
      name: 'Панель управления складом водки',
      exact: true
    }
  ];
}
