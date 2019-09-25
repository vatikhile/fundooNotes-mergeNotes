import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpServiceService } from '../../core/service/http/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { UpdateServiceService } from '../../core/service/update/update-service.service';
import { NoteServiceService } from '../../core/service/note/note-service.service';
import { CollaboratorComponent } from '../../component/collaborator/collaborator.component';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  color: string;
  addNote: any;
  addNoteLabels: any[];
  message: any;
  constructor(private http: HttpServiceService,  private update: UpdateServiceService, private dialog: MatDialog, private snackbar: MatSnackBar, private noteService: NoteServiceService) {

  }
  ngOnInit() {
  }

  @Input() noteId: any;
  @Input() notesData: any;
  @Output() countChange = new EventEmitter();
  @Output() archiveNote = new EventEmitter();
  @Output() remindChange = new EventEmitter();
  /*****
     @purpose:After click on color palete button it open the matmenu which contain the color button after click on particular button it emit that button color
       ******/
  changeColor(color) {
    console.log("color", color);
    this.countChange.emit(color);
  }
  /*****
       @purpose:It is an array which contain the name and hexcode of color
         ******/
  colorCodes =
    [
      [
        { name: "white", hexcode: "#ffffff" },
        { name: "lightGreen", hexcode: "#f28b82" },
        { name: "purple", hexcode: "#f7bc04" },
        { name: "red", hexcode: "#faf474" },
      ],
      [
        { name: "Teal", hexcode: "#cbff90" },
        { name: "pink", hexcode: "#a7ffeb" },
        { name: "orange", hexcode: "#cbf0f8" },
        { name: "blue", hexcode: "#adcbfa" },
      ],
      [
        { name: "brown", hexcode: "#d7aefb" },
        { name: "yellow", hexcode: "#fdcfe8" },
        { name: "darkBlue", hexcode: "#cbb294" },
        { name: "gray", hexcode: "#e8eaed" }
      ]
    ]
  /*****
   @purpose:After click on archieve button it emit the event  
     ******/
  archieveNote(archive) {

    this.archiveNote.emit(archive);
    console.log("archieve", archive);


  }
  /*****
       @purpose:After click on more vert button it open the menu in that after click on delete it hit API which delete the note and that note will become invisible for home page 
         ******/
  deleteNote(noteId) {
    console.log("ggggg");

    var data = {
      "noteIdList": [noteId],
      "isDeleted": true,
    }
    this.http.postDelete('notes/trashNotes', data).subscribe(
      (response) => {
        this.update.changeMessage('');
        this.snackbar.open('Note deleted sucessfully')
      },
      (error) => {
        console.log('error occur when deleting the  note');
      })
  }
  /*****
      @purpose:After click on more vert button it open the menu in that after click on addLabel it shows all label & click on label it hit API which add label to that note
        ******/

  addLabelToNote(noteId, lableId) {
    this.http.postLabel('notes/' + noteId + '/addLabelToNotes/' + lableId + '/add', {}).subscribe(
      (response: any) => {
        console.log(response);
        this.addNote = response.data
        this.update.changeMessage('rewq');
        console.log("swrwer", this.addNote);
        this.getLabels();
        this.snackbar.open('label added to note successfully', 'End now', { duration: 1000 });
      },
      (error) => {
        console.log(error);
        this.snackbar.open('label not added', 'End now', { duration: 1000 });


      }
    )

  }
  /*****
      @purpose:Click on the morevert button it call the getLabels() & shows all the labels on matmenu
        ******/
  morevert() {
    this.getLabels();
  }
  /*****
        @purpose:this function hit the API & getting all the labels which is add previously
          ******/
  getLabels() {
    this.noteService.showNoteLabel().subscribe(
      (response: any) => {
        console.log("get Labels==>", response);
        this.addNoteLabels = response.data.details;
        console.log("this.addNoteLabels", this.addNoteLabels);

      },
      (error) => {
        console.log(error);

      }
    )
  }
  /*****
         @purpose:After click on the reminder button it open the matmenu on that click on later Today 8.00 menu it emit the today reminder
           ******/
  setTodayReminder() {
    var date = new Date().toDateString();
    var reminder1 = date + ", 8:00 "
    this.remindChange.emit(reminder1);
    console.log("in reminder1==>", reminder1);
  }
  /*****
       @purpose:After click on the reminder button it open the matmenu on that click on later Tommorow 8.00 menu it emit the tommorow reminder
         ******/
  setTomorrowReminder = () => {
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
    var date = new Date().toDateString();
    var rewhr = new Date().getDate() + 1;
    date = date.replace(new Date().getDate().toString(), rewhr.toString());
    //console.log("srfas",date);

    date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
    var reminder1 = date + ", 8:00 ";
    this.remindChange.emit(reminder1);
    console.log("tommorow reminder==>", reminder1);
  }
  /*****
       @purpose:After click on the reminder button it open the matmenu on that click on later Next week 8.00 menu it emit the next week reminder
         ******/
  setWeeklyReminder = () => {
    var date = new Date().toDateString();
    var Adate = date.replace(new Date().getDate().toString(), (new Date().getDate() + 7).toString());
    var reminder1 = Adate + ", 8:00";
    this.remindChange.emit(reminder1);
    console.log("weekly reminder==>", reminder1);
  }
  /*****
        @purpose:After click on the collaborator button it open the dialog box & send the data to the collaborator component 
          ******/
  openDialog(notesData: any) {
    console.log(this.notesData.id);

    const dialogRef = this.dialog.open(CollaboratorComponent, {
      data: {
        id: notesData.id,
        collaborators: notesData.collaborators,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}











































































