import { PetsState } from '../app/store/pet/pet.state';
import { BreedsState } from './store/breed/breed.state';

export interface AppState {
  pets: PetsState;
  breeds: BreedsState;
}
