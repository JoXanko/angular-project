// import { google } from '@agm/core/services/google-maps-types';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';

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
  
  imageFile: any;
  breedControl = new FormControl<string | null>(null, Validators.required);
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
  filteredOptions: Observable<string[]> | undefined;
  geocoder = new google.maps.Geocoder();
  address: string = '';
  breeds: string[] = ['Maltezer', 'Sarplaninac', 'Nemacki ovcar'];
  constructor() {}
  ngOnInit(): void {
    
    this.filteredOptions = this.breedControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = value;
        return name ? this._filter(name as string) : this.breeds.slice();
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
    var lt = e.latLng.lat();
    var lg = e.latLng.lng();
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
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.breeds.filter((option) =>
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
}
