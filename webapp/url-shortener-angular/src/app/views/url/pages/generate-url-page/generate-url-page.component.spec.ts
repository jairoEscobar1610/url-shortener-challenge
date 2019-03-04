import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateUrlPageComponent } from './generate-url-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('GenerateUrlPageComponent', () => {
  let component: GenerateUrlPageComponent;
  let fixture: ComponentFixture<GenerateUrlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateUrlPageComponent],

      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
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
  it('should detect an invalid url (missing protocol)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();

    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "google.com"; //Missing protocol
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const urlErrorText = fixture.debugElement.query(By.css("p[id='urlError']"));
        expect(urlErrorText).not.toBe(null);
      });
    });

  });
  it('should detect an invalid url (unsafe characters)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();

    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com<> # % {}|\^~[]`"; //Forbidden chars
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));

      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const urlErrorText = fixture.debugElement.query(By.css("p[id='urlError']"));
        expect(urlErrorText).not.toBe(null);
      });
    });

  });
  it('should detect an empty url', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();

    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = ""; //Missing url
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));

      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const urlErrorText = fixture.debugElement.query(By.css("p[id='urlError']"));
        expect(urlErrorText).not.toBe(null);
      });
    });

  });
  it('should detect a valid url', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();

    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const urlErrorText = fixture.debugElement.query(By.css("p[id='urlError']"));
        expect(urlErrorText).toBe(null);
      });
    });

  });
  it('custom hash - should detect a valid custom hash code', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();
    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        //Should pass everything from here
        const hashInput = fixture.debugElement.query(By.css("input[formControlName='hash']"));
        hashInput.nativeElement.value = ""; //0 characters safe-url code
        hashInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          const hashButton = fixture.debugElement.query(By.css("button[id='hashSubmit']"));
          hashButton.nativeElement.click();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            const hashErrorText = fixture.debugElement.query(By.css("p[id='hashValidateError']"));
            expect(hashErrorText).toBe(null);
          });
        });
      });
    });
  });
  it('custom hash - should detect an invalid custom hash code (empty)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();
    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        //Should pass everything from here
        const hashInput = fixture.debugElement.query(By.css("input[formControlName='hash']"));
        hashInput.nativeElement.value = ""; //0 characters safe-url code
        hashInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          const hashButton = fixture.debugElement.query(By.css("button[id='hashSubmit']"));
          hashButton.nativeElement.click();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            const hashErrorText = fixture.debugElement.query(By.css("p[id='hashValidateError']"));
            expect(hashErrorText).not.toBe(null);
          });
        });
      });
    });
  });
  it('custom hash - should detect an invalid custom hash code (shorter code)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();
    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        //Should pass everything from here
        const hashInput = fixture.debugElement.query(By.css("input[formControlName='hash']"));
        hashInput.nativeElement.value = "abc1"; //4 characters safe-url code
        hashInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          const hashButton = fixture.debugElement.query(By.css("button[id='hashSubmit']"));
          hashButton.nativeElement.click();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            const hashErrorText = fixture.debugElement.query(By.css("p[id='hashValidateError']"));
            expect(hashErrorText).not.toBe(null);
          });
        });
      });
    });
  });
  it('custom hash - should detect an invalid custom hash code (larger code)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();
    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        //Should pass everything from here
        const hashInput = fixture.debugElement.query(By.css("input[formControlName='hash']"));
        hashInput.nativeElement.value = "Abc1543bha"; //10 characters safe-url code
        hashInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          const hashButton = fixture.debugElement.query(By.css("button[id='hashSubmit']"));
          hashButton.nativeElement.click();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            const hashErrorText = fixture.debugElement.query(By.css("p[id='hashValidateError']"));
            expect(hashErrorText).not.toBe(null);
          });
        });
      });
    });
  });
  it('custom hash - should detect an invalid custom hash code (invalid charset)', async () => {
    let fixture = TestBed.createComponent(GenerateUrlPageComponent);
    fixture.detectChanges();
    const urlInput = fixture.debugElement.query(By.css("input[formControlName='url']"));
    urlInput.nativeElement.value = "http://google.com";
    urlInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css("button[id='submitUrl']"));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        //Should pass everything from here
        const hashInput = fixture.debugElement.query(By.css("input[formControlName='hash']"));
        hashInput.nativeElement.value = "`'{% ~"; //7 characters non safe-url code
        hashInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          const hashButton = fixture.debugElement.query(By.css("button[id='hashSubmit']"));
          hashButton.nativeElement.click();
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            const hashErrorText = fixture.debugElement.query(By.css("p[id='hashValidateError']"));
            expect(hashErrorText).not.toBe(null);
          });
        });
      });
    });
  });

});
