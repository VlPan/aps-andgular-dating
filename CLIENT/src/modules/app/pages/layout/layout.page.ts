import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({selector: 'app-layout', templateUrl: './layout.page.html', styleUrls: ['./layout.page.scss']})
export class LayoutPage {
    title = 'lAYOUT';
    constructor(private router: Router) {}

    goToHome() {
      this.router.navigate(['/home']);
    }
}
