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
import { Breed } from 'src/app/store/breed/breed.model';
import { loadBreeds } from 'src/app/store/breed/breed.action';
import { getBreeds } from 'src/app/store/breed/breed.selector';
// import { AuthService } from 'src/app/services/auth.service';
import { FileUpload } from 'src/app/models/fileUpload';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserEffects } from 'src/app/store/user/user.effects';

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

@Component({
  selector: 'app-lost-pet',
  templateUrl: './lost-pet.component.html',
  styleUrls: ['./lost-pet.component.css'],
})
export class LostPetComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  matpopupDuration: number = 3000;
  imgURL: string = '';
  mapCenterLat: number = 43.32472;
  mapCenterLng: number = 21.90333;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  typeOfAnima: any;
  showDogOptions = false;
  showCatOptions = false;
  breedTypeInput = 'dog';
  catBreeds: string[] = [];
  dogBreeds: string[] = [];
  ownerN: string = '';
  ownerID: string = '';
  breeds: Observable<Breed[]> = of([]);
  localDate: Date = new Date();
  imageFile: any;
  lt: any = '';
  lg: any = '';
  BreedControl = new FormControl<string | null>(null, Validators.required);
  nameControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  filteredOptions: Observable<string[]> | undefined;
  geocoder = new google.maps.Geocoder();
  address: string = 'morate postaviti lokaciju na mapi';
  snackBarAction: string = 'Zatvori';
  greenSanckBar: string = 'green-snackbar';
  redSnackBar: string = 'red-snackbar';

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

  @Input() pet: Pet | null = defaultPet;
  @ViewChild('petType', { static: true }) petType: ElementRef<HTMLInputElement>;
  @ViewChild('petBreed', { static: true })
  petBreed: ElementRef<HTMLInputElement>;
  @ViewChild('petName', { static: true }) petName: ElementRef<HTMLInputElement>;
  @ViewChild('petPhone', { static: true })
  petPhone: ElementRef<HTMLInputElement>;
  @ViewChild('petDescription', { static: true })
  petDescription: ElementRef<HTMLInputElement>;

  constructor(
    private uploadService: FileUploadService,
    public UserEffects: UserEffects,
    private store: Store<AppState>,
    petType: ElementRef<HTMLInputElement>,
    petBreed: ElementRef<HTMLInputElement>,
    petDescription: ElementRef<HTMLInputElement>,
    petPhone: ElementRef<HTMLInputElement>,
    petName: ElementRef<HTMLInputElement>,
    private _snackBar: MatSnackBar
  ) {
    this.petDescription = petDescription;
    this.petPhone = petPhone;
    this.petName = petName;
    this.petBreed = petBreed;
    this.petType = petType;
  }
  userData: any;
  ngOnInit(): void {
    this.UserEffects.user$.subscribe((e) => {
      this.ownerID = e.uid;
      this.ownerN = e.displayName;
    });
    this.dogBreeds = [];
    this.catBreeds = [];
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
  }

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
  displayFn(user: string): string {
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
  submit() {
    if (
      this.petName.nativeElement.value != '' &&
      this.petPhone.nativeElement.value != '' &&
      this.petBreed.nativeElement.value != '' &&
      this.lt != '' &&
      this.lg != ''
    ) {
      var type: Type;
      if (this.petType.nativeElement.value === '1') type = Type.Dog;
      else type = Type.Cat;

      this.imgURL = nanoid();
      this.pet = {
        id: nanoid(),
        ownerName: this.ownerN,
        ownerId: this.ownerID,
        name: this.petName.nativeElement.value,
        description: this.petDescription.nativeElement.value,
        found: false,
        phoneNumber: this.petPhone.nativeElement.value,
        photoUrl: this.imgURL,
        type: type,
        date: this.localDate.toLocaleDateString('sr-RS'),
        breed: this.petBreed.nativeElement.value,
        lat: this.lt,
        lng: this.lg,
      };
      this.store.dispatch(addPet({ pet: this.pet }));
      this.upload();
      this._snackBar.open(
        'Uspesno ste objavili da je ljubimac izgubljen!',
        this.snackBarAction,
        {
          duration: this.matpopupDuration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: [this.greenSanckBar],
        }
      );
      this.petName.nativeElement.value = '';
      this.petPhone.nativeElement.value = '';
      this.petBreed.nativeElement.value = '';
      this.petDescription.nativeElement.value = '';
      // this.petType.nativeElement.value= 'false';
      this.lt = '';
      this.lg = '';
    } else {
      var divToShake = document.querySelector('.inputs');
      console.log(divToShake);
      divToShake?.classList.toggle('shakeAnimacija');
      this._snackBar.open(
        'Morate popuniti sva polja i staviti lokaciju!',
        this.snackBarAction,
        {
          duration: this.matpopupDuration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: [this.redSnackBar],
        }
      );
    }
  }
  radButValChange(e: any) {
    this.typeOfAnima = e.value;
    if (e.value == 1) {
      this.filteredOptions = this.BreedControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = value;
          return name
            ? this._filter(name as string, 'dog')
            : this.dogBreeds.slice();
        })
      );
    } else {
      this.filteredOptions = this.BreedControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = value;
          return name
            ? this._filter(name as string, 'cat')
            : this.catBreeds.slice();
        })
      );
    }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    var file;
    if (this.selectedFiles != null) file = this.selectedFiles.item(0);
    if (this.selectedFiles != null && file) {
      var newFileName = 'Jovan';
      var formData = new FormData();
      formData.append(newFileName, file);

      console.log(formData);
    }
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.currentFileUpload.key = this.imgURL;
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
