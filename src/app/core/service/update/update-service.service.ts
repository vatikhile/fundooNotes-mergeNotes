import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateServiceService {
  private messageSource1 = new BehaviorSubject('default message');
  Notes = this.messageSource1.asObservable();

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private messageForNote = new BehaviorSubject('');
  current = this.messageForNote.asObservable();

  constructor() { }
  messageSearch(message: string) {
    this.messageSource1.next(message)
  }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  noteData(message:any){
    this.messageSource.next(message)

  }
  mergeNote(mergeNote: any) {
    this.messageForNote.next(mergeNote)
  }
}

