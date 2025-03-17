import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagerAddComponent } from './usermanager-add.component';

describe('UsermanagerAddComponent', () => {
  let component: UsermanagerAddComponent;
  let fixture: ComponentFixture<UsermanagerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermanagerAddComponent]
    });
    fixture = TestBed.createComponent(UsermanagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
