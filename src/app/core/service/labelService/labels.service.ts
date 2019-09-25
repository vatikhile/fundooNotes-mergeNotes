import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  label1:boolean;
addNotes=[545454545445];
  constructor() { }
  subject = new Subject();
  

  getnote(notes) {
    this.addNotes=notes
      this.subject.next(notes);
      console.log("label service ",this.addNotes);
      
    }
    getnotes(){
      this.getnote(this.addNotes)
      return this.subject.asObservable();
        }
}
