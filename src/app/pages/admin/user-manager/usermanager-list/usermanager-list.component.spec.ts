import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagerListComponent } from './usermanager-list.component';

describe('UsermanagerListComponent', () => {
  let component: UsermanagerListComponent;
  let fixture: ComponentFixture<UsermanagerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermanagerListComponent]
    });
    fixture = TestBed.createComponent(UsermanagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
