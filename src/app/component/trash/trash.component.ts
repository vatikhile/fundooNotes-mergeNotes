import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../core/service/http/http-service.service';
import { UpdateServiceService } from '../../core/service/update/update-service.service';
import { ViewService } from 'src/app/core/service/viewService/view.service';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  addNote: any;
  message: any;
  direction1: string = 'wrap';
  allign: string = '';
  direction: string = "row";
  views: any;

  constructor(private http: HttpServiceService, private update: UpdateServiceService, private view: ViewService) { }

  ngOnInit() {
    this.getTrashNote();
    this.update.currentMessage.subscribe(

      (response: any) => {
        console.log(response);
        this.message = response;

      }
    )


    this.view.getView().subscribe(
      (res) => {
        this.views = res;
        this.direction = this.views.data;
        if (this.direction == 'row') {
          this.direction1 = 'wrap';
          this.allign = ''
          console.log("wrap", this.direction1);

        }
        else {
          this.direction1 = ''
          this.allign = 'center'
          console.log("no wrap", this.direction1);
        }
        // this.toggle=this.views.data1;
        console.log(this.direction);
      });


  }

  /*****
     @purpose:get trash Note List
       ******/
  getTrashNote() {
    //this.updateColor();
    this.http.getNote('notes/getTrashNotesList').subscribe(
      (response: any) => {
        console.log("get response===>", response);
        this.addNote = response.data.data
        console.log("data=>>", this.addNote);

      },
      error => {

        console.log("error: ", error)
      }
    )
  }



  /*****
     @purpose:Delete Note for forever
       ******/
  deleteNote(id) {
    var data = {
      "noteIdList": [id]
    }
    console.log("delete Note", data);
    this.http.postData('notes/deleteForeverNotes', data).subscribe(
      (response: any) => {
        console.log(response);
        // this.addNote=response.data;
        this.getTrashNote();
        console.log("data1==>", this.addNote);
        this.update.changeMessage('rewq');
      },
      error => {
        console.log(error);
      })
  }
}

