import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from './../../models';


export interface UpdateDialogConfirmData {
  updatedProduct: Product;
}

@Component({
  selector: 'update-confirm',
  templateUrl: 'update-confirm.html',
})
export class UpdateDialogConfirm {

  objectKeys = Object.keys;

  constructor(
    public dialogDeleteRef: MatDialogRef<UpdateDialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogConfirmData) {}

}
