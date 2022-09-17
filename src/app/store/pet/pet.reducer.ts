import * as actions from './pet.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Type } from './pet.model';

export interface Pet {
  id: string;
  name: string;
  description: string;
  found: boolean;
  phoneNumber: number;
  photoUrl: string;
  type: Type;
  breed: string;
}

export const petAdapter = createEntityAdapter<Pet>();
export interface State extends EntityState<Pet> {}
export const initialState: State = petAdapter.getInitialState();

export function PetReducer(
  state: State = initialState,
  action: actions.PetActions
) {
    switch (action.type){
        case actions.ADDED:
            return petAdapter.addOne(action.payload,state)
        case  actions.MODIFIED:
            return petAdapter.updateOne({
                id:action.payload.id,
                changes:action.payload
            },state)
        case actions.REMOVED:
            return petAdapter.removeOne(action.payload.id,state)
        default:
            return state;
    }
}

export const getPetState=createFeatureSelector<State>('pet');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
}= petAdapter.getSelectors(getPetState);