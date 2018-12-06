import { Component, ViewChild, ViewContainerRef, AfterContentInit,
  ComponentFactoryResolver, ComponentRef, TemplateRef } from '@angular/core';
import { AddTodoForm } from './../../components/add-todo-form/add-todo-form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss']
})
export class TodoPage implements AfterContentInit {

  component: ComponentRef<AddTodoForm>;
  component2: ComponentRef<AddTodoForm>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('t') t: TemplateRef<any>;

  ngAfterContentInit() {

    this.entry.createEmbeddedView(this.t, {
      $implicit: 'Vladimir',
      location: 'Mogilev',
    });

    const addFormFactory = this.resolver.resolveComponentFactory(AddTodoForm);
    this.component = this.entry.createComponent(addFormFactory);
    this.component2 = this.entry.createComponent(addFormFactory, 0);
    this.component.instance.title = 'THERE IS FORM';
    this.component2.instance.title = 'THERE IS FORM 2222';

    this.component.instance.submitted.subscribe((event) => {
      console.log('Dynamic ouput submit )))');
    });

    this.component2.instance.submitted.subscribe((event) => {
      console.log('Dynamic ouput submit123 )))');
    });

  }
  submitTodos(event) {
    console.log('Submit todos from todo list', event);
  }

  addTodo(event) {
    console.log('Submmited', event);
  }

  rememberUser(event) {
    console.log('remember User', event);
  }

  onDestroy(component:  ComponentRef<any>) {
    console.log(component);
    component.destroy();
  }

  reorderComponents() {
    this.entry.move(this.component2.hostView, 1);
  }
}
