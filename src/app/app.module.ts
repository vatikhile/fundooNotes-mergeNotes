import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './component/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from './component/icon/icon.component';
import { MatChipsModule } from '@angular/material/chips';
import { AllNotesComponent } from './component/all-notes/all-notes.component';
import { LabelComponent } from './component/label/label.component';
import { TrashComponent } from './component/trash/trash.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ArchiveComponent } from './component/archive/archive.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EditNotesComponent } from './component/edit-notes/edit-notes.component';
import { NoteSearchPipePipe } from './pipe/note-search-pipe.pipe';
import { OrderOfPipe } from './pipe/order-of.pipe';
import { SearchComponent } from './component/search/search.component';
import { ProfilePicComponent } from './component/profile-pic/profile-pic.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReminderComponent } from './component/reminder/reminder.component';
import { DisplayLabelsComponent } from './component/display-labels/display-labels.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LikeComponent } from './component/like/like.component';
import { RateComponent } from './component/rate/rate.component';
import { CartComponent } from './component/cart/cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceComponent } from './component/service/service.component';
import { ShowLabelNotesComponent } from './component/show-label-notes/show-label-notes.component';
import { MainCardComponent } from './component/main-card/main-card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotComponent,
    RegisterComponent,
    DashboardComponent,
    AddNoteComponent,
    IconComponent,
    AllNotesComponent,
    LabelComponent,
    TrashComponent,
    CollaboratorComponent,



    // DialogBoxComponent,
    ArchiveComponent,
    EditNotesComponent,
    NoteSearchPipePipe,
    OrderOfPipe,
    SearchComponent,
    ProfilePicComponent,
    ReminderComponent,
    DisplayLabelsComponent,
    QuestionAnswerComponent,
    LikeComponent,
    RateComponent,
    CartComponent,
    ServiceComponent,
    ShowLabelNotesComponent,
    MainCardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ImageCropperModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    FlexLayoutModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FilterPipeModule,
    MatToolbarModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
    Ng4LoadingSpinnerModule,
    MatProgressBarModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LabelComponent, EditNotesComponent, ProfilePicComponent, CollaboratorComponent,ServiceComponent]
})
export class AppModule { }
