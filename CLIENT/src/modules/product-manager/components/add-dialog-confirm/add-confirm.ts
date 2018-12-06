import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from './../../models';

@Component({
  selector: 'add-confirm',
  templateUrl: 'add-confirm.html',
})
export class AddDialogConfirm {

  constructor(
    public dialogDeleteRef: MatDialogRef<AddDialogConfirm>
  ) {}

}
