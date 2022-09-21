import { createFeatureSelector, createSelector } from '@ngrx/store';
import { breedsAdapter, BreedsState } from './breed.state';

const getBreedsState = createFeatureSelector<BreedsState>('breeds');
export const breedsSelector = breedsAdapter.getSelectors();

export const getBreeds = createSelector(
  getBreedsState,
  breedsSelector.selectAll
);
export const getBreedsEntities = createSelector(
  getBreedsState,
  breedsSelector.selectEntities
);
