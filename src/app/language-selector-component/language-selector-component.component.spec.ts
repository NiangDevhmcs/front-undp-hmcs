import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorComponentComponent } from './language-selector-component.component';

describe('LanguageSelectorComponentComponent', () => {
  let component: LanguageSelectorComponentComponent;
  let fixture: ComponentFixture<LanguageSelectorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponentComponent]
    });
    fixture = TestBed.createComponent(LanguageSelectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
