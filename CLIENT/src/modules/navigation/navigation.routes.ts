import {
  NotFoundPage,
  HomePage,
} from './pages';
import { ProductManagerPage } from '../product-manager/pages';
import { Routes } from '@angular/router';
import { PlaygroundPage } from './pages/playground/playground.page';
import { TodoPage } from 'modules/todo/pages';

export const routes: Routes = [
  { path: 'home', component: HomePage, children: [
    {
      path: 'product-manager',
      component: ProductManagerPage
    },
    {
      path: 'playground',
      component: TodoPage
    }
  ]
  }
];
