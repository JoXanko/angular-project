import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Pet } from './pet.reducer';
import * as petActions from './pet.action';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()
export class PetEffects {
  public query$/*: Observable<Action> */= createEffect(() => {
    return this.actions$.pipe(
      ofType(petActions.QUERY),
      switchMap((action) => {
        console.log(action);
        return this.afs
          .collection<Pet>('pets', (ref) => {
            return ref.where('found', '==', 0);
          })
          .stateChanges();
      }),
      mergeMap((actions) => actions),
      map((action: any) => {
        return {
          type: '[Pet] $(action.type)',
          payload: {
            ...action.payload.doc.data(),
            id: action.payload.doc.id,
          },
        };
      })
    );
  });
  public update$/*: Observable<Action> */= createEffect(() => {
    return this.actions$.pipe(
      ofType(petActions.UPDATE),
      map((action: petActions.Update) => action),
      switchMap((data) => {
        const ref = this.afs.doc<Pet>('pets/${data.id}');
        return from(ref.update(data.changes));
      }),
      map(() => new petActions.Succes())
    );
  });
  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
