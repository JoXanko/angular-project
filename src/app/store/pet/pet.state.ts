import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Pet } from "../pet/pet.model";

export interface PetsState extends EntityState<Pet> { }

export const petsAdapter: EntityAdapter<Pet> = createEntityAdapter<Pet>();

export const initialState: PetsState = petsAdapter.getInitialState();