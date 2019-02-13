import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { Users } from '../model/users';
import { UserService } from '../service/service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { exists } from 'fs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [UserService]  
})
export class EditUserComponent implements OnInit {
  rForm: FormGroup;
  public alert = false;
  public users: Users[];
  public users_error: Boolean = false;
  public user = new Users();
  public isLoadingData: Boolean = false;
  public isEdit: Boolean = false;
  formAlert:string = 'This Field is required';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private http: Http,  
              private userService: UserService
              )
              
   {
    this.rForm = fb.group(
    {
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      
    }
    );
   
 // console.log(activatedRoute.snapshot.url); // array of states
    console.log(activatedRoute.snapshot.url[1].path); 
   }

  ngOnInit() 
  {
    this.getUserById(this.user);
  }



  public getUserById(_user: Users) {
  
    this.isLoadingData = true;
    this.userService.getUserById(this.activatedRoute.snapshot.url[1].path)
        .subscribe(
        data => {
       // console.log(data['name']);
        this.isEdit = true;
        //    this.users = data;
        this.user = { id: _user.id, name: data['name'], email: data['email'] };
        },
        error => {
            console.log(error);
            this.isLoadingData = false;
              
        },
        () => {
          this.isLoadingData = false;
           
        });
}


public updateUser(_user: Users) {

  this.alert = true;
 // console.log(_user);
 //  exists; 
  if(_user['name']==null || _user['name']==""  )
  {
   
    this.formAlert;
  }

  else if(_user['email']==null  || _user['email']=="")
  {
   
    this.formAlert;
  }
  else
  {
    
  this.userService.updateUser(_user,this.activatedRoute.snapshot.url[1].path).subscribe(
      data => {
          // refresh the list
          
          alert('User Updated Successfully!');
          this.router.navigate(['../../userdetails']);
          return true;
      },
      error => {
          console.error("Error saving User!");
      
          alert(error);
      }
  );

    }

}

}
