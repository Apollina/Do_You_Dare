import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
@Injectable()
export class Thumbnail implements PipeTransform {
  transform(file: string, size?: string): any {

    file = file.substring(0,file.lastIndexOf('.'));
    if (size === 'medium') {
      return file + '-tn320.png';
    } else if (size === 'small') {
      return file + '-tn160.png';
    } else {
      return file + '-tn640.png';
    }
  }
}
