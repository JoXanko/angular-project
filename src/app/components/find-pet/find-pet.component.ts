import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of } from 'rxjs';
// import * as actions from '../../store/petOLD/pet.action';
// import * as fromPet from '../../store/petOLD/pet.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loadPets, loadPetsSuccess } from 'src/app/store/pet/pet.action';
import { Pet } from 'src/app/store/pet/pet.model';
import { getPets } from 'src/app/store/pet/pet.selector';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FileUploadService } from 'src/app/services/fileUpload.service';

@Component({
  selector: 'app-find-pet',
  templateUrl: './find-pet.component.html',
  styleUrls: ['./find-pet.component.css'],
})
export class FindPetComponent implements OnInit {
  fileUploads?: any[];

  // @ViewChild('map', { static: true }) map: ElementRef<HTMLInputElement>;
  pets: Observable<Pet[]> = of([]);
  notFoundPets: Observable<Pet[]> = of([]);
  public marker: any;
  constructor(
    private store: Store<AppState>,
    private uploadService: FileUploadService // map: ElementRef<HTMLInputElement>
  ) {}
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
  petsMarkerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
  };
  mapClk(e: any) {
    this.myMarker = e.latLng;
    var lt = e.latLng.lat();
    var lg = e.latLng.lng();
    let request: any = {
      latLng: this.myMarker,
    };
    this.fileUploads?.forEach((elem) => {
      console.log(elem);
    });
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  ngOnInit(): void {
    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
      });


    this.store.dispatch(loadPets());
    this.pets = this.store.select(getPets);
    this.pets.pipe(
      map((projects) => projects.filter((proj) => proj.found === false))
    );
    this.notFoundPets = this.pets.pipe(
      map((projects) => projects.filter((proj) => proj.found === false))
    );
    this.notFoundPets.subscribe((res) => console.log(res));
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
  petsMarkerIco = {
    url: '../../../assets/photos/markerPaw.png',
    scaledSize: new google.maps.Size(35, 55),
  };
  getLtLg(pet: Pet): google.maps.LatLngLiteral {
    return { lat: Number(pet.lat), lng: Number(pet.lng) };
  }
}
