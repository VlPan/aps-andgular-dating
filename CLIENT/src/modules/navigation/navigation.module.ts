import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import {
  TodNavbarComponent
 } from './components';

import {
  NotFoundPage,
  HomePage,
} from './pages';

import { ProductManagerPage } from '../product-manager/pages';
import { ProductManagerModule } from './../product-manager/product-manager.module';
import { routes } from './navigation.routes';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    TodNavbarComponent,
    NotFoundPage,
    HomePage
  ],
  imports: [

  CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ProductManagerModule,
    MatButtonModule
  ],
  providers: [],
  exports: [TodNavbarComponent],
  bootstrap: [HomePage]
})
export class NavigationModule {}
