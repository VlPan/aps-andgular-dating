import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as reducer from './product.reducer';

export const getProductsState = createFeatureSelector<reducer.ProductsState>(
  'products'
);
