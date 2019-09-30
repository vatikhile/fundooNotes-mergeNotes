import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/core/service/note/note-service.service';
import { UpdateServiceService } from '../../core/service/update/update-service.service'
import { ViewService } from '../../core/service/viewService/view.service';
import { environment } from 'src/environments/environment';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { SearchService } from '../../core/service/searchService/search.service'
import { Notes } from '../../core/model/Notes/notes';
import { MatSnackBar } from '@angular/material';
// import { NoteServiceService } from '../../core/service/note/note-service.service'
// import { Label } from 'src/app/core/model/label/label';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private flag: boolean = false;
  toggle: boolean = true;
  isMerge: boolean = true;
  addNotes: Notes = new Notes();
  // labelNote: Label = new Label();
  // list: boolean = true;
  // grid: boolean=false;
  addLabels: any = [];
  // mergeNote:any[]=[];
  message: any;
  header: string;
  selectedLabel: any;
  searchContent: any;
  firstName = localStorage.getItem('firstName');
  email = localStorage.getItem('email');
  lastName = localStorage.getItem('lastName');
  profilImaage = localStorage.getItem('profilPic');
  values: string;
  profil: string;
  message1: any;
  constructor(private dialog: MatDialog, private search: SearchService,
    private snackbar: MatSnackBar, private noteService: NoteServiceService,
    private dataService: UpdateServiceService, private view: ViewService,
    private route: Router) { }
  img = environment.url + this.profilImaage;

  ngOnInit() {
    // console.log('dasssssss1111111111111',this.message1);
    /*****
   @purpose:After Open the dashboard it display the set profile image of owner on the toolbar button without refresh the page
   ******/
    console.log("dsesesesse", this.message1);

    this.profil = localStorage.getItem('profilePic');


    /*****
   @purpose:After Open the dashboard it display all labels on the sidenavbar under the label without refresh 
   ******/
    this.showLabel();
    this.sidenavUpdateLabel();
    this.header = 'fundooNotes';

    console.log("vvvvvvvvsssss", this.message1);
    this.mergeNotes();

  }
  @Output() count = new EventEmitter();
  /*****
 @purpose:After click on the profile pic button it open the mat menu and on that click on the button open the dialog box as file event and can set the different image 
 ******/
  profileImage(event): void {
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      width: '400px',
      data: event
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        this.img = environment.url + this.profil
      });
  }

  /*****
  @purpose:on the sidenav display all the labels which are already added
  ******/

  showLabel() {
    this.noteService.showNoteLabel().subscribe(
      (response: any) => {
        this.addLabels = response.data.details;
        // this.addLabels=this.child.addLabels
        console.log(this.addLabels);

      },
      error => {
        console.log("error");
      }
    )
  }

  /*****
    @purpose:In sidenav after click on edit button it opens the dialog box
    ******/
  dialogOpen() {

    console.log('add');
    this.dialog.open(LabelComponent);
  }
  /*****
  @purpose:After click on signout it clear the local storage and redirect on login page
     ******/
  onSignout() {
    localStorage.clear();

  }

  /*****
   @purpose:After performing updation deletion of label on dialog box it update the labels on sidenav  
      ******/
  sidenavUpdateLabel() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.showLabel();
        // this.deleteLabel();
      }
    )
  }
  /*****
  @purpose:After click on the list view button it change to grid view button and send false to the gridview() method of view service   
     ******/
  changeView() {

    this.toggle = false;
    this.view.gridview(this.toggle);

  }
  /*****
  @purpose:After click on the grid view button it change to list view button and send true to the gridview() method of view service   
     ******/
  changeView1() {
    this.toggle = true;
    this.view.gridview(this.toggle);
  }
  /*****
  @purpose:After click on the archieve button on the sidenavbar it change the routes as archieve,open the archieve component   
     ******/
  archive() {
    this.route.navigate(['', 'archive']);

  }
  /*****
 @purpose:After click on the Notes button on the sidenavbar it change the routes as addNotes  
    ******/
  noteButton() {
    this.header = 'fundooNotes';
    this.route.navigateByUrl('/addNotes');
  }
  /*****
    @purpose:After click on the trash button on the sidenavbar it change the routes as trash  
       ******/
  trash() {
    this.header = 'trash'
    this.route.navigate(['', 'trash']);
  }
  /*****
  @purpose:After click on the reminder button on the sidenavbar it change the routes as reminder  
     ******/
  reminder() {

    this.header = 'Reminder';
    this.route.navigate(['', 'reminder']);
  }
  /*****
    @purpose:After click on the search input on the toolbar for entering each key it send it to searchService
       ******/
  onKey() {
    this.search.search(this.searchContent)

  }
  /*****
   @purpose:After click on the close button in the search input field if the input field not contain any text then the close button will be disable,if enter some text then the close button will enable
      ******/
  searchc() {
    this.searchContent = undefined;
  }
  labelOpen(item) {
    try {
      let label = item.label;
      this.route.navigateByUrl('ShowLabelNotes/' + label);
    } catch (error) {
      console.log('error in   in toolbar');

    }
  }
  mainCartOpen() {
    this.route.navigate(['', 'mainCart']);
  }
  mergeNotes() {
    this.dataService.current.subscribe((message1) => {
      this.message1 = message1
      // if(this.message1==''){
      //  this.isMerge=false

      // }
      //  else{
      //   this.isMerge=true

      //  }
    })
    console.log('dasssssss', this.message1);
    this.isMerge = !this.isMerge;

  }
  cancel() {
    console.log('bbb', this.selectedLabel);
    this.isMerge = false

  }
  createNote() {
    this.isMerge = false;
    // this.message1='';
    console.log("tilte", this.addNotes);
    // console.log("description",this.addNotes.description);
    console.log("color",this.addNotes);

    this.noteService.addNote(this.addNotes).subscribe(
      (response: any) => {
        this.view.getNotes();
        console.log(response);
        // this.dataService.currentMessage;
        this.dataService.changeMessage('')
        this.snackbar.open(
          "Note is created Successfully", "",
          { duration: 2500 }
        )
        this.message1 = null
        console.log("ffff", this.message1);

      },
      (error) => {
        console.log("error");
        this.snackbar.open(
          "Note is created Successfully", "",
          { duration: 2500 })
      }
    )
    // this.addNotes = null;
    this.isMerge = false;
    this.dataService.noteData(null)

  }

}


