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
  mapCenterLat: number = 43.32472;
  mapCenterLng: number = 21.90333;
  fileUploads?: any[];
  petsArray: Pet[] = [];
  imagesArray: string[] = [];
  pets: Observable<Pet[]> = of([]);
  notFoundPets: Observable<Pet[]> = of([]);
  public marker: any;
  constructor(
    private store: Store<AppState>,
    private uploadService: FileUploadService // map: ElementRef<HTMLInputElement>
  ) {}
  myMarker: any;
  center: google.maps.LatLngLiteral = {
    lat: this.mapCenterLat,
    lng: this.mapCenterLng,
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
    // this.myMarker = e.latLng;
    var lt = e.latLng.lat();
    var lg = e.latLng.lng();
    var pos = {
      lat: lt,
      lng: lg,
    };
    this.myMarker = pos;
    // let request: any = {
    //   latLng: this.myMarker,
    // };
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
        var haveImage: boolean = false;
        var imageURL: string = '';
        this.notFoundPets.subscribe((pets) =>
          pets.forEach((pet) => {
            // console.log(pet);
            fileUploads.forEach((photo) => {
              // console.log(photo.key);
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
    console.log(this.imagesArray);

    this.store.dispatch(loadPets());
    this.pets = this.store.select(getPets);
    this.pets.pipe(
      map((projects) => projects.filter((proj) => proj.found === false))
    );
    this.notFoundPets = this.pets.pipe(
      map((projects) => projects.filter((proj) => proj.found === false))
    );
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

  getDistanceFromLatLonInKm(pos1: any, pos2: any) {
    if (pos1 != null) {
      var lat1 = this.myMarker.lat;
      var lon1 = this.myMarker.lng;
      var lat2 = pos2.lat;
      var lon2 = pos2.lng;
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      if (d < 1) {
        return (
          'Udaljenost od vase lokacije: ' + (d * 1000).toFixed(0) + ' metara'
        );
      }
      return 'Udaljenost od vase lokacije: ' + d.toFixed(2) + ' kilometara';
    }
    return 'Postavite vasu trenutnu lokaciju na mapi kako biste videli koliko su izgubljeni ljubimci udaljeni od vas';
  }

  deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }
}
