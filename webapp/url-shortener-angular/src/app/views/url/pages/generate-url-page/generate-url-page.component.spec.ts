import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateUrlPageComponent } from './generate-url-page.component';

describe('GenerateUrlPageComponent', () => {
  let component: GenerateUrlPageComponent;
  let fixture: ComponentFixture<GenerateUrlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateUrlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateUrlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
