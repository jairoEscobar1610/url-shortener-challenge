import { AbstractControl } from '@angular/forms';

export function ValidateHash(control: AbstractControl) {
    let regex = new RegExp("^[A-Za-z0-9]{7}$");    
  if (!regex.test(control.value)) {
   
    return { validHash: true };
  }
  return null;
}