import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { PetService } from 'src/app/services/pet.service';
import { AppState } from '../../app.state';
import { Pet } from '../pet/pet.model';
import * as PetActions from './pet.action';
import { getPets } from './pet.selector';
@Injectable()
export class PetEffects {
  constructor(
    private action$: Actions,
    private petService: PetService,
    private store: Store<AppState>
  ) {}

  // create
  addPet$ = createEffect(() =>
    this.action$.pipe(
      ofType(PetActions.addPet),
      mergeMap((action) =>
        this.petService.addPet(action.pet).pipe(
          map((pet: Pet) => PetActions.addPetSuccess({ pet: pet })),
          catchError(() => of({ type: 'create error' }))
        )
      )
    )
  );

  // read
  loadPets$ = createEffect(() =>
    this.action$.pipe(
      ofType(PetActions.loadPets),
      withLatestFrom(this.store.select(getPets)),
      mergeMap(() =>
        this.petService.getPets().pipe(
          map((pets: Pet[]) => PetActions.loadPetsSuccess({ pets: pets })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  // update
  updatePet$ = createEffect(() =>
    this.action$.pipe(
      ofType(PetActions.updatePet),
      mergeMap((action) =>
        this.petService.updatePet(action.pet).pipe(
          map((pet) => {
            const updatedPet: Update<Pet> = {
              id: action.pet.id,
              changes: {
                ...action.pet,
              },
            };

            return PetActions.updatePetSuccess({ pet: updatedPet });
          }),
          catchError(() => of({ type: 'update error' }))
        )
      )
    )
  );

  // delete
  deleteEntrie$ = createEffect(() =>
    this.action$.pipe(
      ofType(PetActions.deletePet),
      mergeMap((action) =>
        this.petService.deletePet(action.petID).pipe(
          map((entry) => PetActions.deletePetSuccess({ petID: action.petID })),
          catchError(() => of({ type: 'delete error' }))
        )
      )
    )
  );
}
