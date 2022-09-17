import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as actions from '../../store/pet/pet.action';
import * as fromPet from '../../store/pet/pet.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-find-pet',
  templateUrl: './find-pet.component.html',
  styleUrls: ['./find-pet.component.css'],
})
export class FindPetComponent implements OnInit {
  pets: Observable<any> = of([]);
  public marker: any;
  constructor(private store: Store<fromPet.State>) {}
  myMarker: any;
  center: google.maps.LatLngLiteral = {
    lat: 43.32472,
    lng: 21.90333,
  };
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
  };
  myMarkerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.BOUNCE,
  };
  clk(e: any) {
    this.myMarker = e.latLng;
    var lt = e.latLng.lat();
    var lg = e.latLng.lng();
    let request: any = {
      latLng: this.myMarker,
    };
  }
  ngOnInit(): void {
    this.pets = this.store.select(fromPet.selectAll);
    this.store.dispatch(new actions.Query());
    this.pets.subscribe(res => console.log(res.found));
  }
  myLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.myMarker = pos;
    });
  }
  myMarkerIco = {
    url: '../../../assets/photos/markerDef.png',
    scaledSize: new google.maps.Size(35, 55),
  };
}
