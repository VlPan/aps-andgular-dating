import { Action } from '@ngrx/store';

import { Product } from './../../models';


export const LOAD_PRODUCTS = '[ProductS] Load Products';
export const LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';

export class LoadProducts implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadProductsFail implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductsSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export const CREATE_PRODUCT = '[Products] Create Product';
export const CREATE_PRODUCT_FAIL = '[Products] Create Product Fail';
export const CREATE_PRODUCT_SUCCESS = '[Products] Create Product Success';

export class CreateProduct implements Action {
  readonly type = CREATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class CreateProductFail implements Action {
  readonly type = CREATE_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class CreateProductSuccess implements Action {
  readonly type = CREATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export const UPDATE_PRODUCT = '[Products] Update Product';
export const UPDATE_PRODUCT_FAIL = '[Products] Update Product Fail';
export const UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success';

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = UPDATE_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export const REMOVE_PRODUCT = '[Products] Remove Product';
export const REMOVE_PRODUCT_FAIL = '[Products] Remove Product Fail';
export const REMOVE_PRODUCT_SUCCESS = '[Products] Remove Product Success';

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: Product) {}
}

export class RemoveProductFail implements Action {
  readonly type = REMOVE_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = REMOVE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

// action types
export type ProductAction =
  | LoadProducts
  | LoadProductsFail
  | LoadProductsSuccess
  | CreateProduct
  | CreateProductFail
  | CreateProductSuccess
  | UpdateProduct
  | UpdateProductFail
  | UpdateProductSuccess
  | RemoveProduct
  | RemoveProductFail
  | RemoveProductSuccess;
