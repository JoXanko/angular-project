import { createReducer, on } from '@ngrx/store';
import * as Actions from './pet.action';
import { petsAdapter, PetsState, initialState } from './pet.state';

export const petReducer = createReducer(
  initialState,

  // create
  on(Actions.addPetSuccess, (currentState: PetsState, action) => {
    return petsAdapter.addOne(action.pet, currentState);
  }),

  // read
  on(Actions.loadPetsSuccess, (currentState: PetsState, action) => {
    return petsAdapter.setAll(action.pets, currentState);
  }),

  // update
  on(Actions.updatePetSuccess, (currentState: PetsState, action) => {
    return petsAdapter.updateOne(action.pet, currentState);
  }),

  // delete
  on(Actions.deletePetSuccess, (currentState: PetsState, action) => {
    return petsAdapter.removeOne(action.petID, currentState);
  })
);
