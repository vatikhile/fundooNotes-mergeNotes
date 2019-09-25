import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../core/service/http/http-service.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Question, reply } from "../../core/model/question-and-answer/question"
import { UpdateServiceService } from '../../core/service/update/update-service.service'

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})

export class QuestionAnswerComponent implements OnInit {

  noteId: any;
  notesData: any;
  notes: any;
  editorContent: any;
  newContent: any;
  value: any
  profilpic: any;
  img: any;
  value1: boolean = true;
  editorContent1: any;
  questionId: any;
  notes1: any;
  show = false;
  sidnav: string;
  title: any;
  user: any;
  description: any;
  AnswerArray: any[];
  parentId: any;
  display: boolean;
  showEditorId = false;
  showSecondReply = false;
  showSecondId = '';
  showId = '';
  secondId = '';
  public QuestionModel: Question;
  public replyModel: reply;


  constructor(private route: ActivatedRoute, private http: HttpServiceService, private snackbar: MatSnackBar, private update: UpdateServiceService) { }


  ngOnInit() {


    // console.log(this.cardToken);
    this.noteId = this.route.snapshot.params['id'];
    console.log("idd", this.noteId);
    this.method();

    this.update.currentMessage.subscribe(data => {
      console.log('data in ask question', data);
      this.sidnav = data;


    }, err => {
      console.log('error in ask question', err);

    })

  }

  // localStorage.getItem('profilePic');


  method() {
    this.http.noteData('notes/getNotesDetail/' + this.noteId).subscribe(
      (res) => {
        console.log("response", res);

        this.notes = res['data']['data'];
        console.log("notes", this.notes);

        this.title = this.notes[0].title;
        console.log("title", this.title);
        this.user = this.notes[0].user;
        console.log("user", this.user);
        this.description = this.notes[0].description;
        console.log("description", this.description);
        this.value = this.notes[0].questionAndAnswerNotes[0];
        console.log("value", this.value);

        this.AnswerArray = this.notes[0].questionAndAnswerNotes;
        console.log("AnswerArray", this.AnswerArray);
        if (this.notes[0].questionAndAnswerNotes[0] != undefined)
          console.log("full");
        this.parentId = this.notes[0].questionAndAnswerNotes[0].id;
        console.log("parentId", this.parentId);

        this.AnswerArray.splice(0, 1);
        console.log("aplice array", this.AnswerArray.splice(0, 1));
        this.display = true;
        // this.spinnerService.hide();
        console.log(this.AnswerArray);
        if (this.AnswerArray != null)
          console.log("blank");

        for (let i = 0; i < this.AnswerArray.length; i++) {
          console.log(this.AnswerArray[i].id, 'Id and parent id', this.AnswerArray[i].parentId);
        }
      },

      err => {
        console.log('error ', err);

      })


  }

  question() {
    this.showEditorId = false;
    var data = {
      "message": this.editorContent,
      "notesId": this.noteId
    }
    console.log("question body====>", data);
    if (this.editorContent == null) {
      this.snackbar.open(
        "Froala editor is empty & click on submit button", "", { duration: 2000 })

    }
    else {
      this.http.addQuestion('/questionAndAnswerNotes/addQuestionAndAnswer', data)
        .subscribe(

          (response: any) => {
            this.method();
            // this.showLabel();
            console.log("question added sucessfully", response);
            // this.dataService.changeMessage('')

            this.snackbar.open(
              "question add sucessfully", "",
              { duration: 2500 }

            )
            this.editorContent = ""
          },
          error => {
            this.snackbar.open(
              "error occur", "",
              { duration: 2500 }
            )
          }

        )
    }
  }
  reply(id: any) {
    this.showEditorId = false;
    this.replyModel = new reply();
    this.showEditorId = false;
    this.replyModel.message = this.editorContent;
    this.replyModel.id = id;
    if (this.editorContent.length < 30 && this.question != undefined) {
      // this.snackbar('Not a proper Answer', '');
      this.editorContent = '';
      return;
    }
    console.log(this.replyModel);



    this.http.addQuestion('/questionAndAnswerNotes/reply/' + id, this.replyModel).subscribe(
      (res) => {
        // this.answer=
        this.snackbar.open("answer added suceessfully", "", { duration: 2000 });
        console.log("reply", res);

      },
      (error) => {
        this.snackbar.open("error occur", "", { duration: 2000 });
      }

    )
  }
  openEditor() {
    this.value1 = false;
  }
  showEditor(question) {
    console.log(question);

    this.showEditorId = question.id
  }
  showSecondReplyMethod(id: any) {
    this.showSecondReply = true;
    this.showSecondId = id;
  }
  setId(index) {
    console.log('data is ', index);
    console.log('id is ', index.id);

    this.showId = index.id;
  }
  setSecondId(index) {
    this.secondId = index.id;
  }
  hideSecondReplyMethod(id) {
    if (this.showSecondId == id) {
      this.showSecondId = '';
    }
  }
}

