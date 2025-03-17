import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfilIdentityComponent } from './card-profil-identity.component';

describe('CardProfilIdentityComponent', () => {
  let component: CardProfilIdentityComponent;
  let fixture: ComponentFixture<CardProfilIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardProfilIdentityComponent]
    });
    fixture = TestBed.createComponent(CardProfilIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
