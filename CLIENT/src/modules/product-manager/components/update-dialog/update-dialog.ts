import { Component, Inject, AfterContentInit, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Product } from './../../models';
import { Validators, FormControl } from '@angular/forms';
import { UpdateDialogConfirm } from '../update-dialog-confirm';
import { MyErrorStateMatcher } from '../add-dialog';


export interface UpdateDialogData {
  product: Product;
}


@Component({
  selector: 'update-dialog',
  templateUrl: 'update-dialog.html',
  styleUrls: ['update-dialog.scss']
})
export class UpdateDialog implements AfterContentInit  {

  constructor(
    public dialogUpdateRef: MatDialogRef<UpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData,
    public dialog: MatDialog
  ) {

  }

    nameFormControl: FormControl;
    priceFormControl: FormControl;
    amountFormControl: FormControl;
    matcher: MyErrorStateMatcher;
    formControls: FormControl[];
    visibleData: {name: string, price: number, amount: number};
    isOneValChanged: boolean = false;


    ngAfterContentInit(): void {

      this.nameFormControl = new FormControl('', [
        Validators.required
      ]);
      this.priceFormControl = new FormControl('', [
        Validators.required,
      ]);
      this.amountFormControl = new FormControl('', [
        Validators.min(1),
      ]);
      this.matcher = new MyErrorStateMatcher();

      this.formControls = [
        this.nameFormControl,
        this.priceFormControl,
        this.amountFormControl
      ]
      this.nameFormControl.setValue(this.data.product.name);
      this.priceFormControl.setValue(this.data.product.price);
      this.amountFormControl.setValue(this.data.product.amount);

      this.visibleData = {
        name:  this.data.product.name,
        price: this.data.product.price,
        amount: this.data.product.amount
      }
    }

    submit() {
      const name = this.nameFormControl.value;
      const price = this.priceFormControl.value;
      const amount = this.amountFormControl.value;
      const product: Product = {
        id: this.data.product.id,
        name,
        price,
        amount,
        updatedAt: new Date(),
        createdAt: this.data.product.createdAt
      }

      const visualUpdatedProduct = {
        name: product.name,
        price: product.price,
        amount: product.amount
      }

      const dialogRef = this.dialog.open(UpdateDialogConfirm, {
        data: {
          updatedProduct: visualUpdatedProduct
        }
      });

      const subsriber = dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.dialogUpdateRef.close(product)
          subsriber.unsubscribe();
        }
      });
    }

    oneValueChanged() {
      let counter = 0;
      for (let key in this.visibleData) {
        if(this.visibleData[key].toString() !== this.formControls[counter].value) {
          return this.isOneValChanged = true;
        }
        counter++;
      }
      return this.isOneValChanged = false;
    }
}
