import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../core/service/http/http-service.service';
import { UpdateServiceService } from 'src/app/core/service/update/update-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  setReminder: any;
  addNote: any[];

  constructor(private http: HttpServiceService, private update: UpdateServiceService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAllReminderNote();
  }

  /** Update Note Reminder*/
  updateReminder(items, $event) {

    this.setReminder = $event

    console.log("get reminder", this.setReminder);
    var noteData = {
      "reminder": this.setReminder,
      "noteIdList": [items.id]
    }
    console.log("jdfdhfhd", noteData);

    this.http.postData('notes/addUpdateReminderNotes', noteData).subscribe(
      (response: any) => {
        console.log(response);
        this.addNote = response.data;
        this.update.changeMessage('');
        console.log("data1==>", this.addNote);
        this.snackbar.open('note reminder added Successfully..', 'End now', { duration: 1000 });
      },
      error => {
        console.log(error);
        this.snackbar.open('reminder not set', 'End now', { duration: 1000 });
      }
    )
  }

  /*Get All Note List*/
  getAllReminderNote() {
    this.http.getNote('notes/getReminderNotesList').subscribe(
      (response: any) => {
        this.addNote = response.data.data
        console.log("reminder data=>>", this.addNote);
        console.log("Response in get note", this.addNote);
        this.snackbar.open('get reminder note successfully', 'End now', { duration: 1000 });
      },
      error => {
        this.snackbar.open('Error in get reminder notes', 'End now', { duration: 3000 });
        console.log("error: ", error)
      }
    )
  }
}










