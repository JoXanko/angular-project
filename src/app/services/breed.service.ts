import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../store/breed/breed.model';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(private httpClient: HttpClient) {}

  private readonly breedUrl: string = environment.api + '/breeds';

  transferBreed: Breed | null = null;
  editMode: boolean = false;

  // read
  getBreeds(): Observable<Breed[]> {
    return this.httpClient.get<Breed[]>(this.breedUrl);
  }
}
