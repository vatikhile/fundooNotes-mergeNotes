import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateServiceService } from '../../core/service/update/update-service.service';
import { HttpServiceService } from '../../core/service/http/http-service.service';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  search: any[];
  searchvalue = new FormControl('');
  firstName = new FormControl('')
  addNote: any[];
  message: string;
  collabId: any;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private update: UpdateServiceService, private http: HttpServiceService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  first = localStorage.getItem('firstName');
  last = localStorage.getItem('lastName');
  email1 = localStorage.getItem('email');
  profilImaage = localStorage.getItem('profilPic');
  id = this.data.id
  collaborators = this.data.collaborators
  img = environment.url + this.profilImaage;

  ngOnInit() {
    /*****
   @purpose:Click on collaborator button it display the profile image of owner in the mat-fab-button
   ******/

  alert("dbqhwebhbhew");
    localStorage.getItem('profilePic');
    console.log("collab", this.collaborators);
    this.update.currentMessage.subscribe(
      response => {
        this.message = response;
        this.collaborators
      })
  }
  @Input() notecollab: any
  /*****
  @purpose:when enter the key in the input field it hit the API and give the option as relate to email ,first name & last name
  ******/
  searchList() {
    var data = {
      "searchWord": this.searchvalue.value
    }
    console.log("new data==>", data);

    this.http.postSearch('user/searchUserList', data).subscribe(
      (response: any) => {
        console.log(response);
        this.search = response.data.details
        console.log(this.search);
      },
      (error) => {
        console.log(error);

      }
    )
  }
  /*****
 @purpose:After enter the email click on save button it hit the addcollab function and note will collaborate with that user
 ******/
  addCollab(id: any) {
    console.log("adada", this.search[0]);

    console.log("iddddd", id);


    this.http.postData('notes/' + id + '/AddcollaboratorsNotes', this.search[0]).subscribe(
      (response: any) => {
        console.log(response);
        this.update.changeMessage('');

        this.snackbar.open('collab successfully...', 'End now', { duration: 1000 });
      },
      (error) => {
        console.log(error);
        this.snackbar.open('error in collab', 'End now', { duration: 1000 });
      }
    )
  }
  /*****
 @purpose:Get all the notes display on the home page
  ******/
  getAllNote() {
    this.http.getNote('notes/getNotesList').subscribe(
      (response: any) => {
        console.log("get response===>", response);
        this.addNote = this.notecollab
        console.log("Response in get note", this.addNote);
      },
      error => {

        console.log("error: ", error)
      }
    )
  }
  /*****
@purpose:Click on the close button infront of collaborator user it will remove collaboration and further it will not displaying this to that user  
******/
  deleteCollab(id: any) {
    this.collabId = this.collaborators.id;
    this.http.delete1('notes/' + id + '/removeCollaboratorsNotes/' + this.collabId).subscribe(
      (response: any) => {
        console.log("response collab ", response);

        this.update.changeMessage('');
        this.snackbar.open("collaborator deleted sucessfully", "", { duration: 2000 })
      },
      (error) => {
        this.snackbar.open("Not deleted ", "", { duration: 2000 })
      }
    )
  }
  /*****
 @purpose:Click on cancel button it close the dialog box
 ******/
  closeDialog() {
    this.dialog.closeAll();
  }
}



















