import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigateSpy;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,MockLoaderComponent, MockComponent ],
      imports:[HttpClientModule,RouterTestingModule.withRoutes([
        { path: 'home',component:MockComponent },{path:"generate", component:MockComponent},
        {path:"list", component:MockComponent}
       ]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('Header should navigate on click - home', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("a[id='homelink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/home');
    });
   
  })));
  it('Header should navigate on click - generate', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("a[id='generatelink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/generate');
    });
   
  })));
  it('Header should navigate on click - list', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("a[id='listlink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/list');
    });
   
  })));
  it('Header logo should navigate on click - home', async(
    inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css("a[id='logolink']")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/home');
    });
   
  })));

  
  
});

@Component({
  selector: 'app-loader',
  template: ''
})
class MockLoaderComponent {
}

@Component({
  selector: '',
  template: ''
})
class MockComponent {
}
