import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductManagerPage } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { effects } from './store';
import { reducer as productReducer } from './store/reducers/product.reducer';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { ProductService } from './product-manager.service';
import { DeleteDialog } from './components/delete-dialog';
import { UpdateDialog } from './components/update-dialog/update-dialog';
import { UpdateDialogConfirm } from './components/update-dialog-confirm/update-confirm';
import { AddDialog } from './components/add-dialog';
import { AddProductFrom } from './components/add-product-form/add-product-form';
import { AddDialogConfirm } from './components/add-dialog-confirm/';

@NgModule({
  declarations: [
    ProductManagerPage,
    DeleteDialog,
    UpdateDialog,
    UpdateDialogConfirm,
    AddDialog,
    AddProductFrom,
    AddDialogConfirm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    ProductService
  ],
  entryComponents: [
    DeleteDialog,
    UpdateDialog,
    AddDialog,
    UpdateDialogConfirm,
    AddDialogConfirm
  ],
  exports: [ProductManagerPage],
  bootstrap: [ProductManagerPage]
})
export class ProductManagerModule {}
