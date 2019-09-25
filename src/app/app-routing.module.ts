import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component'
import { ResetPasswordComponent } from './component/reset-password/reset-password.component'
import { ForgotComponent } from './component/forgot/forgot.component'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { AllNotesComponent } from './component/all-notes/all-notes.component';
import { LabelComponent } from './component/label/label.component'
import { AuthGuardService } from './core/service/auth/auth-guard.service'
import { SearchComponent } from '../app/component/search/search.component'
import { ArchiveComponent } from '../../src/app/component/archive/archive.component'
import { TrashComponent } from '../../src/app/component/trash/trash.component'
import { ReminderComponent } from '../../src/app/component/reminder/reminder.component'
import { QuestionAnswerComponent } from '../../src/app/component/question-answer/question-answer.component'
import { CartComponent } from './component/cart/cart.component';
import { ShowLabelNotesComponent } from './component/show-label-notes/show-label-notes.component';
import { MainCardComponent } from './component/main-card/main-card.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/cart',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartComponent

  },
  {

    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'forgot',
    component: ForgotComponent

  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: DashboardComponent,
    children: [

      {
        path: 'addNotes',
        component: AddNoteComponent
      },
      {
        path: 'reminder',
        component: ReminderComponent
      },
      {
        path: 'label',
        component: LabelComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'allNotes',
        component: AllNotesComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'questionAnswer/:id',
        component: QuestionAnswerComponent
      },
      {
        path:'ShowLabelNotes/:label',
        component:ShowLabelNotesComponent
      },
      {
        path:'mainCart',
        component:MainCardComponent
      }
      
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
