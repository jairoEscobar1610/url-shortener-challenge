import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[urlencode]'
})
export class UrlencodeDirective {
  constructor(public ngControl?: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  /**
   * @description Encode characters for URL-safety as the user types-in
   * @param event entry value
   * @param backspace {boolean} check if the typed key is 'backspace'
   */
  onInputChange(event, backspace: boolean) {
    try {
      let newVal = decodeURI(event);
      if (newVal) {
        newVal = encodeURI(newVal);
        this.ngControl.valueAccessor.writeValue(newVal);
      }
    } catch (err) { //EncodeURI Malformed, do nothing with the original value

    }
  }

}
