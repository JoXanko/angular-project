import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { PetService } from 'src/app/services/pet.service';
import { loadPets, updatePet } from 'src/app/store/pet/pet.action';
import { defaultPet, Pet } from 'src/app/store/pet/pet.model';
import { getPets } from 'src/app/store/pet/pet.selector';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css'],
})
export class MyPetsComponent implements OnInit {
  petToChange: Pet = defaultPet;
  address: any;
  geocoder = new google.maps.Geocoder();
  fileUploads?: any[];
  petsArray: Pet[] = [];
  imagesArray: string[] = [];
  pets: Observable<Pet[]> = of([]);
  myPets: Observable<Pet[]> = of([]);
  ownerID: string = '';
  ownerN: string = '';

  constructor(
    private store: Store<AppState>,
    private uploadService: FileUploadService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((e) => {
      this.ownerID = e.uid;
      this.ownerN = e.displayName;
    });
    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .pipe(
        map((file) =>
          file.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
        var haveImage: boolean = false;
        var imageURL: string = '';
        this.store.dispatch(loadPets());
        this.pets = this.store.select(getPets);
        this.pets.pipe(
          map((projects) =>
            projects.filter((proj) => proj.ownerId === this.ownerID)
          )
        );
        this.myPets = this.pets.pipe(
          map((projects) =>
            projects.filter((proj) => proj.ownerId == this.ownerID)
          )
        );

        this.myPets.subscribe((pets) =>
          pets.forEach((pet) => {
            fileUploads.forEach((photo) => {
              if (pet.photoUrl == photo.key && photo.url) {
                imageURL = photo.url;
                haveImage = true;
              }
            });
            if (haveImage == true) this.imagesArray.push(imageURL);
            else this.imagesArray.push('');

            haveImage = false;
          })
        );
      });
  }
  getAddress(lat: any, lng: any) {
    let latlng = new google.maps.LatLng(lat, lng);
    let request: any = {
      latLng: latlng,
    };
    console.log(request);
    this.geocoder.geocode(request, (results: any, status: any) => {
      this.address = results[0].formatted_address;
    }); //vraca adresu od latitude i longitude
  }
  found(pet: Pet) {
    this.petToChange = { ...pet, found: !pet.found };
    this.store.dispatch(updatePet({ pet: this.petToChange }));
  }
}
