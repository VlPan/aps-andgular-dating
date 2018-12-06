import { Component, Inject, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Product } from './../../models';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../add-dialog';



export interface ProductFieldsToAdd {
  price: number;
  amount: number;
  productName: string;
}


@Component({
  selector: 'add-product-form',
  templateUrl: 'add-product-form.html',
  styleUrls: ['add-product-form.scss']
})
export class AddProductFrom implements AfterContentInit  {
  priceFormControl: FormControl;
  amountFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  submitted: boolean;
  ngAfterContentInit(): void {

    this.priceFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.amountFormControl = new FormControl('', [
      Validators.min(1),
      Validators.required,
    ]);
    this.matcher = new MyErrorStateMatcher();

    if(this.price) {
      this.priceFormControl.setValue(this.price)
    }

  }

  @Input() productName: string
  @Input() price: number
  @Output() productAdded: EventEmitter <any> = new EventEmitter();
  @Output() addProductCanceled: EventEmitter <any> = new EventEmitter();
  constructor() {}


  submit() {
    const price = this.priceFormControl.value;
    const amount = this.amountFormControl.value;
    const productFields: ProductFieldsToAdd = {price, amount, productName: this.productName}


    this.submitted = true;
    this.productAdded.emit(productFields);
  }

  cancelChanges(productName: string) {
    console.log('cancal cahnges')
    this.addProductCanceled.emit(productName);
  }

}
