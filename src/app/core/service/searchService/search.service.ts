import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  text: any;
  data1 = this.text;

  constructor() { }

  subject = new Subject();

  search(text: any) {
    this.subject.next(text);
    console.log("data", text);
  }
  getsearch() {
    this.search(this.data1);
    return this.subject.asObservable();

  }

}
