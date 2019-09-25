import { Component, OnInit } from '@angular/core';
import { UpdateServiceService } from 'src/app/core/service/update/update-service.service';
import { MatSnackBar } from '@angular/material';
import {Label} from '../../core/model/label/label';
import {NoteServiceService} from '../../core/service/note/note-service.service'
import { ViewService } from 'src/app/core/service/viewService/view.service';
import { MatDialog} from '@angular/material';
import { EditNotesComponent } from '../edit-notes/edit-notes.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  userNote: any;
  color: string;
  views:any;
  direction:string;
  labels = new Label();
  messageSource: string;
  archive: any;
  addNote: any;
  message: any;
  setColor: any;
  constructor( private update:UpdateServiceService,private snackbar:MatSnackBar,private dialog :MatDialog,private view: ViewService,private noteService:NoteServiceService) {
  update.currentMessage.subscribe(
  status => { this.messageSource = status })
    this.update.currentMessage.subscribe(data => { this.userNote = data })
  }
   
    ngOnInit() {
/*****
 @purpose:Click on the archieve button on the sidenavbar all the archieve note will display without refreshing 
 ******/
    this.getArchiveNotes();
    console.log("34r5343564wew3");
    this.update.currentMessage.subscribe(

      (response:any)=>{
        console.log(response);
        this.message=response;
        this.getArchiveNotes();
      }
    )
  }
  /*****
 @purpose:Click on the archieve mat-icon-button it is invisible from archive note list and it will become visible in home
 ******/
  archiveNote(items,$event){

    this.archive=$event
    var data={
      "isArchived":false,
      "noteIdList":[items.id]
    }
    console.log("archive note=-=>",data);
    this.noteService.postArchive(data).subscribe(
      (response:any)=>{
        console.log("abc",response);
  
        this.update.changeMessage('rewq');
        // this.getArchiveNotes();

        this.snackbar.open('note archived Successful', 'End now', {duration: 1000});    
        // this.getArchiveNotes();   

      },
      (error)=>{
        console.log(error);
        this.snackbar.open('note not archived', 'End now', {duration: 1000});       

      }
    )
    
  }
  /*****
 @purpose:It get all note which status is archive true after hit the API
 ******/
  getArchiveNotes(){
    console.log("ewr4w3e543564654657");
    
    
    this.noteService.getNoteArchive().subscribe(
           (response:any) => {
             this.addNote=response.data.data
             console.log("Archive data=>>",this.addNote);
             console.log("Response in get note",this.addNote);
             this.snackbar.open('get archived note successfully', 'End now', {duration: 1000});
           },
           error=> {
            this.snackbar.open('get archive note error', 'End now', {duration: 1000});
             console.log("error: ",error)
           }
           )
  }
  /*****
 @purpose:Click on any note which are displayed on archieve page open the dialog box which have editable 
 ******/
  openDialog(items:any){
    this.dialog.open(EditNotesComponent,{
      data:{
        title:items.title,
        description:items.description,
        id:items.id,
        color:items
    }
    });
    console.log("hhh",items.title,);
    
  }
    /*****
 @purpose:Click on color palete it return the event i.e color from icon component and change the color of note
 ******/
  changeColor(items,$event)
    {
      this.setColor=$event
     console.log("get color" ,this.setColor);
     var data={
       "color":this.setColor,
       "noteIdList":[items.id]
     }
     console.log("jdfdhfhd",data);
     
       this.noteService.postColor(data).subscribe(
         (response:any)=>{
             console.log(response);
             this.addNote=response.data;
                console.log("data1==>",this.addNote);
                this.update.changeMessage('');          
                this.snackbar.open('note color updated Successfully..', 'End now', {duration: 1000}); 
         },
         error=>{
           console.log(error);
           this.snackbar.open('note color not updated', 'End now', {duration: 1000}); 
         })
     }

}











