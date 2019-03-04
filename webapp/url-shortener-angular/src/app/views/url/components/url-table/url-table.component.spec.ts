import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlTableComponent } from './url-table.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MockupGeneratedUrls } from '../../../../core/mockups/generated-url.mockup';
import { By } from '@angular/platform-browser';

describe('UrlTableComponent', () => {
  let component: UrlTableComponent;
  let fixture: ComponentFixture<UrlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlTableComponent ],
      imports:[FormsModule,MDBBootstrapModule,HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click on remove button after initialization', async () => {
    
    let fixture = TestBed.createComponent(UrlTableComponent);
    fixture.detectChanges();
    component.elements = MockupGeneratedUrls;
    fixture.whenStable().then(() => {
      fixture.debugElement.query(By.css("button[id='remove-0']")).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(component.removeUrl).toHaveBeenCalled();
      });
    });


    
  });
  
});
