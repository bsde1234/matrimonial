import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add this
import { EditUserComponent } from './edit-user/edit-user.component';  // Add this
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
  ,
  {
    path: 'dashboard',
    component: DashboardComponent
  }
  ,
  {
    path: 'adduser',
    component: AddUserComponent
  }
  ,
  {
    path: 'userdetails',
    component: UserDetailsComponent
  },
  
  {
    path: 'changepassword',
    component: ChangePasswordComponent
  },
 
  {
    path: 'login',
    component: LoginComponent
  },
 
  {
    path: 'edituser/:id',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
