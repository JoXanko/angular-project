import { createAction, props } from '@ngrx/store';
import { Breed } from '../breed/breed.model';

// read
export const loadBreeds = createAction('[Home Breed] Load Breeds');
export const loadBreedsSuccess = createAction(
  '[Home Breed] Load Breed Success',
  props<{ breeds: Breed[] }>()
);
