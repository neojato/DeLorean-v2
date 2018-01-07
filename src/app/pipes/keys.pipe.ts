import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})

export class KeysPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    const keys = [];
    for (const key in value) {
      if (1 === 1) {
        keys.push(value[key]);
      }
    }
    return keys;
  }
}
