import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TodoPage } from './pages';
import { FormsModule } from '@angular/forms';

import {
  TodoList,
  AddTodoForm,
  AuthRememberComponent
 } from './components';

@NgModule({
  declarations: [
    TodoPage,
    TodoList,
    AddTodoForm,
    AuthRememberComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  entryComponents: [
    AddTodoForm
  ],
  providers: [],
  exports: [TodoPage],
  bootstrap: [TodoPage]
})
export class TodoModule {}
