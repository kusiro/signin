import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTitle'
})
export class DisplayTitlePipe implements PipeTransform {

  transform(value: any, index: number): string {
    if (value && value.length) {
      return value;
    } else {
      if (index === 0) {
        return '隊長';
      } else {
        return '隊員 ' + index.toString();
      }
    }
  }

}
