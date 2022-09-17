import { Action } from '@ngrx/store';
import { Pet } from './../pet/pet.model';

export const QUERY = '[Pet] query pets';
export const ADDED = '[Pet] added';
export const MODIFIED = '[Pet] modified';
export const REMOVED = '[Pet] removed';
export const UPDATE = '[Pet] update';
export const SUCCESS = '[Pet] update success';

export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

export class Added implements Action {
  readonly type = ADDED;
  constructor(public payload: Pet) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: Pet) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor(public payload: Pet) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Pet>) {}
}

export class Succes implements Action {
  readonly type = SUCCESS;
  constructor() {}
}

export type PetActions = Query | Added | Modified | Removed | Update | Succes;
