import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPetComponent } from './find-pet.component';

describe('FindPetComponent', () => {
  let component: FindPetComponent;
  let fixture: ComponentFixture<FindPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
