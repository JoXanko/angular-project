import { createReducer, on } from '@ngrx/store';
import * as Actions from './breed.action';
import { breedsAdapter, BreedsState, initialState } from './breed.state';

export const breedReducer = createReducer(
  initialState,
  // read
  on(Actions.loadBreedsSuccess, (currentState: BreedsState, action) => {
    return breedsAdapter.setAll(action.breeds, currentState);
  })
);
