import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, MockComponent ],
      imports:[RouterTestingModule.withRoutes([
        { path: 'home',component:MockComponent },{path:"generate", component:MockComponent},
        {path:"list", component:MockComponent}
       ]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Home page button should navigate on click - generate', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("button[id='generatelink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/generate');
    });
   
  })));
  it('Header should navigate on click - list', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("button[id='listlink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/list');
    });
   
  })));
});

@Component({
  selector: '',
  template: ''
})
class MockComponent {
}