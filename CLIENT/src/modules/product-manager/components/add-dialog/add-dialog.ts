import { Component, Inject, AfterContentInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, ErrorStateMatcher} from '@angular/material';
import { Product } from './../../models';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UpdateDialogConfirm } from '../update-dialog-confirm';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductFieldsToAdd } from './../add-product-form/add-product-form';
import { AddDialogConfirm } from './../add-dialog-confirm/add-confirm';


export interface AddDialogData {
  allProducts: Product[];
  selectedProducts: Product[];
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-dialog',
  templateUrl: 'add-dialog.html',
  styleUrls: ['add-dialog.scss']
})
export class AddDialog implements AfterContentInit  {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    productCtrl = new FormControl();
    filteredProducts: Observable<string[]>;
    allProductNames: string[] = [];
    selectedProductNames: string[] = [];
    addedProductNames: string[] = [];
    replenishProductNames: string[] = [];
    finalAddedProductsForUpdate: Product[] = [];
    finalAddedProductsForCreate: Product[] = [];


    @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;

    constructor(
      public dialogUpdateRef: MatDialogRef<AddDialog>,
      @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
      public dialog: MatDialog
    ) {
      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(null),
        map((product: string | null) => product ? this._filter(product) : this.allProductNames.slice()));

        this.allProductNames = this.data.allProducts.map(p => p.name);
        const slectedFromMainPage = this.data.selectedProducts.map(p => p.name);
        this.selectedProductNames = [...slectedFromMainPage];
        this.replenishProductNames = [...slectedFromMainPage];
    }

    priceFormControl: FormControl;
    amountFormControl: FormControl;
    matcher: MyErrorStateMatcher;

    ngAfterContentInit(): void {

      this.priceFormControl = new FormControl('', [
        Validators.required,
      ]);
      this.amountFormControl = new FormControl('', [
        Validators.min(1),
      ]);
      this.matcher = new MyErrorStateMatcher();
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      if(
        this.selectedProductNames.indexOf(event.value) >= 0 ||
        this.addedProductNames.indexOf(event.value) >= 0
      ){
        return;
      }

      if ((value || '').trim()) {
        this.selectedProductNames.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.productCtrl.setValue(null);
      this.addedProductNames.push(value.trim());
    }

    remove(productName: string): void {
      console.log('REMOVE', productName);
      const index = this.selectedProductNames.indexOf(productName);

      if (index >= 0) {
        this.selectedProductNames.splice(index, 1);
      }

      this.cancelAddProduct(productName);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      if(
        this.selectedProductNames.indexOf(event.option.viewValue) >= 0 ||
        this.addedProductNames.indexOf(event.option.viewValue) >= 0
      ){
        return;
      }
      this.selectedProductNames.push(event.option.viewValue);
      this.replenishProductNames.push(event.option.viewValue);
      this.productInput.nativeElement.value = '';
      this.productCtrl.setValue(null);
    }

    addProduct(event: ProductFieldsToAdd) {
      console.log('productFieldsToAdd', event);
      const productFromOutput = JSON.parse(JSON.stringify(event));
      if(~this.addedProductNames.indexOf(productFromOutput.productName)) {
        const product: Product = {
          name: productFromOutput.productName,
          price: productFromOutput.price,
          amount: productFromOutput.amount,
          updatedAt: new Date(),
          createdAt: new Date()
        }
        this.finalAddedProductsForCreate.push(product)
        console.log(this.finalAddedProductsForCreate);
      }
      if(~this.replenishProductNames.indexOf(productFromOutput.productName)) {
        const productToUpdate = JSON.parse(JSON.stringify(this.data.allProducts.find(p => p.name === productFromOutput.productName)));
        productToUpdate.amount = parseInt(productToUpdate.amount, 10);

        productToUpdate.price = productFromOutput.price;
        productToUpdate.amount += productFromOutput.amount;
        productToUpdate.updatedAt = new Date();

        this.finalAddedProductsForUpdate.push(productToUpdate);
        console.log(this.finalAddedProductsForUpdate);
      }

    }

    cancelAddProduct(name: string) {
      if(~this.addedProductNames.indexOf(name)) {
        const indexAdd = this.addedProductNames.indexOf(name);
        const indexSel = this.selectedProductNames.indexOf(name);
        const pr = this.finalAddedProductsForCreate.find(pr => pr.name === name);
        const indexCr = this.finalAddedProductsForCreate.indexOf(pr);
        this.addedProductNames.splice(indexAdd, 1);
        this.selectedProductNames.splice(indexSel, 1);
        this.finalAddedProductsForCreate.splice(indexCr, 1);
        console.log(this.addedProductNames);
      }
      if(~this.replenishProductNames.indexOf(name)) {
        const indexRep = this.replenishProductNames.indexOf(name);
        this.replenishProductNames.splice(indexRep, 1);
      }
      if(~this.selectedProductNames.indexOf(name)) {
        const indexSel = this.selectedProductNames.indexOf(name);
        const indexRep = this.replenishProductNames.indexOf(name);
        const pr = this.finalAddedProductsForUpdate.find(pr => pr.name === name);
        const indexUpd = this.finalAddedProductsForUpdate.indexOf(pr);
        this.selectedProductNames.splice(indexSel, 1);
        this.replenishProductNames.splice(indexRep, 1);
        this.finalAddedProductsForUpdate.splice(indexUpd, 1);
        console.log(this.selectedProductNames);
      }

    }

    getPriceByName(productName: string) {
      const product: Product = this.data.allProducts.find(p => p.name === productName);
      if(product) {
        return product.price
      }

      return '';
    }

    saveResults() {
      const dialogRef = this.dialog.open(AddDialogConfirm);

      const subsriber = dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.dialogUpdateRef.close({
            productsForCreate: this.finalAddedProductsForCreate,
            productsForUpdate: this.finalAddedProductsForUpdate
          })
          subsriber.unsubscribe();
        }
      });
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allProductNames.filter(product => product.toLowerCase().indexOf(filterValue) === 0);
    }
}
