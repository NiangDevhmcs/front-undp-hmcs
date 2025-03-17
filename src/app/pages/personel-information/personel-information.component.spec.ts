import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelInformationComponent } from './personel-information.component';

describe('PersonelInformationComponent', () => {
  let component: PersonelInformationComponent;
  let fixture: ComponentFixture<PersonelInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonelInformationComponent]
    });
    fixture = TestBed.createComponent(PersonelInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
