import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChangePasswordComponent } from './card-change-password.component';

describe('CardChangePasswordComponent', () => {
  let component: CardChangePasswordComponent;
  let fixture: ComponentFixture<CardChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardChangePasswordComponent]
    });
    fixture = TestBed.createComponent(CardChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
