import { Component, Output, EventEmitter, ContentChild, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthRememberComponent } from './auth-remember.component';



@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoForm implements AfterContentInit, AfterViewInit {

  title = 'hello world';

  @Output() submitted: EventEmitter <any> = new EventEmitter();


  @ViewChild('email') email: ElementRef;

  @ContentChild(AuthRememberComponent ) remember: AuthRememberComponent;

  ngAfterContentInit() {
    this.remember.checked.subscribe((isRememberUser: boolean) => this.showIfUserRemember(isRememberUser));
  }

  ngAfterViewInit () {
    console.log(this.email);
  }

  submit(event) {
    this.submitted.emit(event);
  }

  showIfUserRemember(is: boolean) {
    if (is) {
      alert('User remember');
    }
  }


}
