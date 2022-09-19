import { createFeatureSelector, createSelector } from "@ngrx/store";
import { petsAdapter, PetsState } from "./pet.state";


const getPetsState = createFeatureSelector<PetsState>('pets');
export const petsSelector = petsAdapter.getSelectors();

export const getPets = createSelector(getPetsState, petsSelector.selectAll);
export const getPetsEntities = createSelector(getPetsState, petsSelector.selectEntities);