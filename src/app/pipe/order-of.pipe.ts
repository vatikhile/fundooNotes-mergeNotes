import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderOf'
})
export class OrderOfPipe implements PipeTransform {
  transform(value) {
    if (!value || !value.length) {
      return;
    }
    return value.slice().reverse();
  }

}
