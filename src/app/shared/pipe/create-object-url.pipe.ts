import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'createObjectURL' })
export class CreateObjectURLPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(value: File): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(value))
  }
}
