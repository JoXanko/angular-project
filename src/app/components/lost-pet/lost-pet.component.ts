// import { google } from '@agm/core/services/google-maps-types';
import { defaultPet, Pet, Type } from '../../store/pet/pet.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, Observable, of, startWith, tap } from 'rxjs';
import { PetService } from 'src/app/services/pet.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { addPet } from 'src/app/store/pet/pet.action';
import { nanoid } from 'nanoid';
import { User } from 'src/app/store/user/user.model';
import * as userActions from '../../store/user/user.actions';
import { Breed } from 'src/app/store/breed/breed.model';
import { loadBreeds } from 'src/app/store/breed/breed.action';
import { getBreeds } from 'src/app/store/breed/breed.selector';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
interface AppStateUser {
  user: User;
}
@Component({
  selector: 'app-lost-pet',
  templateUrl: './lost-pet.component.html',
  styleUrls: ['./lost-pet.component.css'],
})
export class LostPetComponent implements OnInit {
  breedTypeInput="dog";
  catBreeds: string[] = [];
  dogBreeds: string[] = [];
  owner: string = '';
  user$: Observable<User> = new Observable<User>();
  breeds: Observable<Breed[]> = of([]);
  @Input() pet: Pet | null = defaultPet;
  @ViewChild('petType', { static: true }) petType: ElementRef<HTMLInputElement>;
  @ViewChild('petBred', { static: true }) petBred: ElementRef<HTMLInputElement>;
  @ViewChild('petName', { static: true }) petName: ElementRef<HTMLInputElement>;
  @ViewChild('petPhone', { static: true })
  petPhone: ElementRef<HTMLInputElement>;
  @ViewChild('petDescription', { static: true })
  petDescription: ElementRef<HTMLInputElement>;
  localDate: Date = new Date();
  imageFile: any;
  lt: any;
  lg: any;
  dogBreedControl = new FormControl<string | null>(null, Validators.required);
  catBreedControl = new FormControl<string | null>(null, Validators.required);
  nameControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
  markerIco = {
    url: '../../../assets/photos/markerPaw.png',
    scaledSize: new google.maps.Size(35, 55),
  };

  matcher = new MyErrorStateMatcher();
  filteredDogOptions: Observable<string[]> | undefined;
  filteredCatOptions: Observable<string[]> | undefined;
  geocoder = new google.maps.Geocoder();
  address: string = '';
  // breeds: string[] = ['Maltezer', 'Sarplaninac', 'Nemacki ovcar'];
  constructor(
    private storeUser: Store<AppStateUser>,
    private petService: PetService,
    private store: Store<AppState>,
    petType: ElementRef<HTMLInputElement>,
    petBred: ElementRef<HTMLInputElement>,
    petDescription: ElementRef<HTMLInputElement>,
    petPhone: ElementRef<HTMLInputElement>,
    petName: ElementRef<HTMLInputElement>
  ) {
    this.petDescription = petDescription;
    this.petPhone = petPhone;
    this.petName = petName;
    this.petBred = petBred;
    this.petType = petType;
  }
  ngOnInit(): void {
    this.user$ = this.storeUser.select('user');
    this.storeUser.dispatch(new userActions.GetUser());
    this.user$.subscribe((user) => (this.owner = user.displayName));

    this.store.dispatch(loadBreeds());
    this.breeds = this.store.select(getBreeds);
    this.breeds.subscribe((res) => console.log(res));

    this.breeds.forEach((breeds: Breed[]) => {
      breeds.forEach((breed) => {
        if (breed.type === 'dog') this.dogBreeds.push(breed.name);
        else this.catBreeds.push(breed.name);
      });
    });
    console.log(this.dogBreeds);
    console.log(this.catBreeds);

    this.filteredDogOptions = this.dogBreedControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = value;
        return name ? this._filter(name as string,"dog") : this.dogBreeds.slice();
      })
    );
    this.filteredCatOptions = this.catBreedControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = value;
        return name ? this._filter(name as string,"cat") : this.catBreeds.slice();
      })
    );
  }
  value = '';
  marker: any;
  // options={options: {animation:google.maps.Animation.DROP}};
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
  };
  center: google.maps.LatLngLiteral = {
    lat: 43.32472,
    lng: 21.90333,
  };
  markerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.BOUNCE,
  };
  clk(e: any) {
    this.marker = e.latLng;
    //console.log(e.latLng.lat(), e.latLng.lng());
    this.lt = e.latLng.lat();
    this.lg = e.latLng.lng();
    let request: any = {
      latLng: this.marker,
    };

    this.geocoder.geocode(request, (results: any, status: any) => {
      this.address = results[0].formatted_address;
    }); //vraca adresu od latitude i longitude
  }
  displayFn(user: string): string {
    // return user && user.name ? user.name : '';
    return user && user ? user : '';
  }
  private _filter(name: string, type: string): string[] {
    const filterValue = name.toLowerCase();
    if (type === 'dog')
      return this.dogBreeds.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
      else
      return this.catBreeds.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageFile = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      console.log(this.imageFile);
    }
  }
  submit() {
    var type: Type;
    if (this.petType.nativeElement.value === '1') type = Type.Dog;
    else type = Type.Cat;

    this.pet = {
      id: nanoid(),
      ownerName: this.owner,
      name: this.petName.nativeElement.value,
      description: this.petDescription.nativeElement.value,
      found: false,
      phoneNumber: this.petPhone.nativeElement.value,
      photoUrl: '',
      type: type,
      date: this.localDate.toLocaleDateString('sr-RS'),
      breed: this.petBred.nativeElement.value,
      lat: this.lt,
      lng: this.lg,
    };
    this.store.dispatch(addPet({ pet: this.pet }));
  }
}
