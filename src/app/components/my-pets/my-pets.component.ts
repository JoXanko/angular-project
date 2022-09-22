import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { loadPets, updatePet } from 'src/app/store/pet/pet.action';
import { defaultPet, Pet } from 'src/app/store/pet/pet.model';
import { getPets } from 'src/app/store/pet/pet.selector';
import { UserEffects } from 'src/app/store/user/user.effects';

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
  mapCenterLat: number = 43.32472;
  mapCenterLng: number = 21.90333;
  lt: any = '';
  lg: any = '';

  markerIco = {
    url: '../../../assets/photos/markerPaw.png',
    scaledSize: new google.maps.Size(35, 55),
  };
  value = '';
  marker: any;
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
  };
  center: google.maps.LatLngLiteral = {
    lat: this.mapCenterLat,
    lng: this.mapCenterLng,
  };
  markerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.BOUNCE,
  };

  constructor(
    private store: Store<AppState>,
    private uploadService: FileUploadService,
    public UserEffects: UserEffects
  ) {
  }

  ngOnInit(): void {
    this.UserEffects.user$.subscribe((e) => {
      this.ownerID = e.uid;
      this.ownerN = e.displayName;
    });
    this.uploadService
      .getFiles(100)
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
  clk(e: any) {
    this.marker = e.latLng;
    this.lt = e.latLng.lat();
    this.lg = e.latLng.lng();
    let request: any = {
      latLng: this.marker,
    };

    this.geocoder.geocode(request, (results: any, status: any) => {
      this.address = results[0].formatted_address;
    }); //vraca adresu od latitude i longitude
  }
  found(pet: Pet) {
    this.petToChange = { ...pet, found: !pet.found };
    this.store.dispatch(updatePet({ pet: this.petToChange }));
  }
  displayAndHide(pet:Pet) {
    var divToHide = document.getElementById(pet.id+"old");
    if (divToHide) divToHide.style.display = 'none';

    var divToShow = document.getElementById(pet.id);
    if (divToShow) divToShow.style.display = 'flex';
  }
  close(pet:Pet){
    var divToHide = document.getElementById(pet.id+"old");
    if (divToHide) divToHide.style.display = 'flex';

    var divToShow = document.getElementById(pet.id);
    if (divToShow) divToShow.style.display = 'none';
  }
  update(pet: Pet) {
    var phone: string = '';
    var desc: string = '';
    if (this.lg == '' && this.lt == '') {
      this.lg = pet.lng;
      this.lt = pet.lat;
    }

    var petPhone = (document.getElementById('petPhone')as HTMLInputElement);
    if(petPhone)
    console.log(petPhone.value)

    var petDesc = (document.getElementById('petDescription')as HTMLInputElement);
    if(petDesc)
    console.log(petDesc.value)

    if (petPhone.value == '') phone = pet.phoneNumber;
    else phone = petPhone.value;

    if (petDesc.value == '') desc = pet.description;
    else desc = petDesc.value;

    console.log(this.lg)
    console.log(this.lt)
    console.log(phone)
    console.log(desc)
    this.petToChange = {
      ...pet,
      found: !pet.found,
      phoneNumber: phone,
      description: desc,
      lat: this.lt,
      lng: this.lg,
    };
    this.store.dispatch(updatePet({ pet: this.petToChange }));
  }
}
