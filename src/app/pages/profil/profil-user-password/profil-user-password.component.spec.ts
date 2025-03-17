import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserPasswordComponent } from './profil-user-password.component';

describe('ProfilUserPasswordComponent', () => {
  let component: ProfilUserPasswordComponent;
  let fixture: ComponentFixture<ProfilUserPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUserPasswordComponent]
    });
    fixture = TestBed.createComponent(ProfilUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
