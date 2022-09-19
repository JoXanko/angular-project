import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { BreedService } from "src/app/services/breed.service";
import { AppState } from "../../app.state";
import { Breed } from "../breed/breed.model";
import * as BreedActions from './breed.action';
import { getBreeds } from "./breed.selector";
@Injectable()
export class BreedEffects {
    constructor(
        private action$: Actions,
        private breedService: BreedService,
        private store: Store<AppState>
    ) { }

    // read
    loadBreeds$ = createEffect(() =>
        this.action$.pipe(
            ofType(BreedActions.loadBreeds),
            withLatestFrom(this.store.select(getBreeds)),
            mergeMap(() =>
                this.breedService.getBreeds().pipe(
                    map((breeds: Breed[]) => BreedActions.loadBreedsSuccess({ breeds:breeds })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

}