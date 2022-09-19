import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pet } from '../store/pet/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private httpClient: HttpClient) {}

  private readonly petUrl: string = environment.api + '/pets';

  transferPet: Pet | null = null;
  editMode: boolean = false;

  // read
  getPets() : Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(this.petUrl);
  }

  // update
  updatePet(pet: Pet) {
    return this.httpClient.patch(`${this.petUrl}/${pet.id}`, pet);
  }

  // create
  addPet(pet: Pet) {
    return this.httpClient.post<Pet>(this.petUrl, pet);
  }

  // delete
  deletePet(petID: string) {
    return this.httpClient.delete(`${this.petUrl}/${petID}`);
  }

}
