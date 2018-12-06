
import { Product } from './../../models';
import { ProductAction } from '../actions';
import { LOAD_PRODUCTS_FAIL, UPDATE_PRODUCT_SUCCESS, CREATE_PRODUCT_SUCCESS, REMOVE_PRODUCT_SUCCESS } from '../actions/products.action';
import {
    LOAD_PRODUCTS,
    LOAD_PRODUCTS_SUCCESS,
} from './../actions/products.action';

export interface ProductsState {
  entities: { [id: number]: Product };
  productsStatus: ProductsStatus;
}

export enum ProductsStatus {
    INIT,
    LOADING,
    SUCCESS,
    FAILED
}

export const initialState: ProductsState = {
  entities: {},
  productsStatus: ProductsStatus.INIT,
};

export function reducer(
  state = initialState,
  action: ProductAction
): ProductsState {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        productsStatus: ProductsStatus.LOADING
      };
    }

    case LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;

      console.log(products);
      const entities = products.reduce(
        (entities: { [id: number]: Product }, product: Product) => {
          return {
            ...entities,
            [product.id]: product,
          };
        },
        {
          ...state.entities,
        }

      );
      console.log('EEE', entities);
      return {
        ...state,
        productsStatus: ProductsStatus.SUCCESS,
        entities
      };
    }

    case LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        productsStatus: ProductsStatus.FAILED
      };
    }

    case UPDATE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza,
      };

      return {
        ...state,
        entities,
      };
    }

    case REMOVE_PRODUCT_SUCCESS: {
      const product = action.payload;
      const { [product.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsStatus = (state: ProductsState) => state.productsStatus;

