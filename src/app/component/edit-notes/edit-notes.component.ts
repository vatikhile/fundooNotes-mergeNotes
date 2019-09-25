import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NoteServiceService } from '../../core/service/note/note-service.service';
import { MatSnackBar } from '@angular/material';
import { UpdateServiceService } from '../../core/service/update/update-service.service'

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  toggle: boolean = this.data.isPined;
  constructor(private noteService: NoteServiceService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any, private updateData: UpdateServiceService) { }
  noteData = this.data;
  color = this.data.color;
  ngOnInit() {
  }
  /*****
       @purpose:After click on the close button it hit the API which update the note and display the updation in notes.
          ******/
  updateNotes() {
    var data = {
      "noteId": this.noteData.id,
      "title": this.noteData.title,
      "description": this.noteData.description,
      // "isPined":this.noteData.isPined
    }
    this.noteService.updateNote(data).subscribe(
      (response: any) => {
        this.updateData.changeMessage('');
        this.snackbar.open("Note updated sucessfully", "", { duration: 2000 });
      },
      (error) => {
        this.snackbar.open("Error:Note not updated")
      }
    )
  }
  /*****
     @purpose:After click on note if the note is pin then it display the pin on the edit dialog box
        ******/
  team() {
    // this.toggle=true;
    // this.noteData.isPined=true;
    console.log("true");
  }
  /*****
       @purpose:After click on note if the note is unpin then it display the unpin on the edit dialog box
         ******/
  changeteam() {
    this.toggle = false;
    this.data.isPined = this.toggle;
    // this.noteData.isPined=this.toggle;
  }
}
