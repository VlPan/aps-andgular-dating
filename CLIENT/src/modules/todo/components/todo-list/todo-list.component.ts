import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoList {
  @Output() submitted: EventEmitter <any> = new EventEmitter();

  submit(event) {
    this.submitted.emit(event);
  }
}
