import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Pet } from '../pet/pet.model';

// create
export const addPet = createAction(
  '[Create Pet] Add Pet',
  props<{ pet: Pet }>()
);
export const addPetSuccess = createAction(
  '[Create Pet] Add Pet Success',
  props<{ pet: Pet }>()
);

// update
export const updatePet = createAction(
  '[Create Pet] Update Pet',
  props<{ pet: Pet }>()
);
export const updatePetSuccess = createAction(
  '[Create Pet] Update Pet Success',
  props<{ pet: Update<Pet> }>()
);

// delete
export const deletePet = createAction(
  '[Home Pet] Delete Pet',
  props<{ petID: string }>()
);
export const deletePetSuccess = createAction(
  '[Home Pet] Delete Pet Success',
  props<{ petID: string }>()
);

// read
export const loadPets = createAction('[Home Pet] Load Pets');
export const loadPetsSuccess = createAction(
  '[Home Pet] Load Pet Success',
  props<{ pets: Pet[] }>()
);
