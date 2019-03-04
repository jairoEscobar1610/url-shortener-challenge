import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        
      ],
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockFooterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'url-shortener-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('url-shortener-angular');
  });


  @Component({
    selector: 'app-header',
    template: ''
  })
  class MockHeaderComponent {
  }
  @Component({
    selector: 'app-footer',
    template: ''
  })
  class MockFooterComponent {
  }
});
