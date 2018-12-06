import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/product.reducer';

import { Product } from './../../models';
import { getProductsStatus } from '../reducers/product.reducer';


export const getProductsEntities = createSelector(
    fromFeature.getProductsState,
    fromProducts.getProductsEntities
);


export const getAllProducts = createSelector(getProductsEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getProductStatus = createSelector(
   fromFeature.getProductsState,
   fromProducts.getProductsStatus
);
