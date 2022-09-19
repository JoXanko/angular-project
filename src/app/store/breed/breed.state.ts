import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Breed } from "../breed/breed.model";

export interface BreedsState extends EntityState<Breed> { }

export const breedsAdapter: EntityAdapter<Breed> = createEntityAdapter<Breed>();

export const initialState: BreedsState = breedsAdapter.getInitialState();