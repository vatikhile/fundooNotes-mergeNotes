import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material';
import { NoteServiceService } from '../../core/service/note/note-service.service'
import { Label } from 'src/app/core/model/label/label';
import { MatSnackBar } from '@angular/material';
import { UpdateServiceService } from '../../core/service/update/update-service.service'
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  labelNote: Label = new Label();
  addLabels: any[];
  Id = "";
  Idd = "";

  constructor(private noteService: NoteServiceService, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<DashboardComponent>, private dataService: UpdateServiceService) { }

  ngOnInit() {
    this.showLabel();
  }

  done() {
    this.dialogRef.close();
    console.log("done")
    this.addLabel();
  }
  /*****
   @purpose:On the dialog Box after click on check button it add the label  
   ******/
  addLabel() {
    console.log("labellll", this.labelNote.label);
    var data = {
      "label": this.labelNote.label,
      "isDeleted": false,
      "userId": localStorage.getItem('Id')
    }
    console.log("new data=>>", data);

    this.noteService.addLabel(data).subscribe(

      (response: any) => {
        this.showLabel();
        console.log("sucess label add", response);
        this.dataService.changeMessage('')

        this.snackbar.open(
          "label is created Successfully", "",
          { duration: 2500 }

        )
      },
      error => {
        console.log("errorddd");

      }
    )
    this.close();
  }
  /*****
 @purpose:On the dialog box the added label display below the added label field
 ******/
  showLabel() {
    this.noteService.showNoteLabel().subscribe(
      (response: any) => {
        this.addLabels = response.data.details;

        console.log("show Labels", this.addLabels)

      },
      error => {

        console.log("error");
      }
    )
  }

  /*****
 @purpose:click on delete button it delete the added the labels
 ******/
  deleteLabel(id: any) {
    this.noteService.deleteLabels(id).subscribe(
      (response: any) => {
        this.showLabel();
        this.dataService.changeMessage('')
        this.snackbar.open("label deleted sucessfully", "undo", { duration: 2000 });
      },
      (error) => {
        this.snackbar.open("Not deleted", "undo", { duration: 2000 });

      }
    )
  }
  /*****
  @purpose:On the dialogbox After click on create button it toggle or change the button to check button
  ******/
  teamchange(id: any) {
    this.Id = id;
  }
  /*****
  @purpose:on the dialog box After click on check button it update the label and it toggle or change the button to create button
  ******/
  team(item) {

    this.Id = "";
    var reqbody =
    {
      "label": item.label,
      "isDeleted": false,
      "id": item.id,
      "userId": "userId"
    }


    console.log("this is labelnote", reqbody.label)
    console.log("this label id", reqbody.id);

    this.noteService.updateLabel(reqbody.id, reqbody).subscribe(
      (response: any) => {
        this.showLabel();
        console.log("this is update response", response);
        this.dataService.changeMessage('')
        this.snackbar.open("sucessfully updated", "", { duration: 2000 });
        console.log("upadte ....");

      })
    error => {
      console.log("error", error)
      this.snackbar.open("Not updated", "", { duration: 2000 });
    }

  }
  /*****
 @purpose:on the dialog box After hover on labels its change into delete button and enable the button to delete the specified label
 ******/
  hover(id: any) {
    this.Idd = id;
  }
  /*****
    @purpose:on the dialog box After click on close button it clear label name type there before click on check button
    ******/
  close() {
    this.labelNote.label = null;
  }
}
