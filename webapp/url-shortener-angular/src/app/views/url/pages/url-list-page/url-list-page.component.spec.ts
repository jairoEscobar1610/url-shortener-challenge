import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlListPageComponent } from './url-list-page.component';
import { UrlTableComponent } from '../../components/url-table/url-table.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MockupGeneratedUrls } from '../../../../core/mockups/generated-url.mockup';
import { Url } from '../../../../shared/models/url.model';

describe('UrlListPageComponent', () => {
  let component: UrlListPageComponent;
  let fixture: ComponentFixture<UrlListPageComponent>;
  let templateTableFixture: ComponentFixture<UrlTableComponent>;
  let urlTableComponent: UrlTableComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlListPageComponent, UrlTableComponent ],
      imports:[FormsModule,MDBBootstrapModule,HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlListPageComponent);
    templateTableFixture = TestBed.createComponent(UrlTableComponent);
    component = fixture.componentInstance;
    component.elements = new Array<Url>();
    component.elements.push(...[MockupGeneratedUrls[0]]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind list of url with details', async() => {
    expect(component.elements[0].hash === "ABCDEFG").toBeTruthy();
  });


});
