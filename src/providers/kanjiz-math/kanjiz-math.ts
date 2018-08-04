import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class KanjizMathProvider {

  constructor(public http: HttpClient) {
    console.log('Hello KanjizMathProvider Provider');
  }

  randomInt(max, forbidden1?, forbidden2?, forbidden3?) {
    let value = -1;
    do {
      value = Math.floor(Math.random() * max);
    }
    while(value == forbidden1 || value == forbidden2 || value == forbidden3);
    return value;
  }

  shuffle(array: any): any {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
