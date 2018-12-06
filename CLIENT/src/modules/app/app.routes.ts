

import { Routes } from '@angular/router';
import { LayoutPage } from 'modules/app/pages';
import { HomePage, NotFoundPage } from 'modules/navigation/pages';
import { TodNavbarComponent } from '../navigation/components/navbar/navbar.component';


export const routes: Routes = [
  { path: '',
    redirectTo: '/layout',
    pathMatch: 'full'
  },
  { path: 'layout', component: LayoutPage, pathMatch: 'full' },
  { path: 'home', component: HomePage, pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
