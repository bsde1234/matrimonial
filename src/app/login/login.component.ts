import { Component, OnInit,  ViewEncapsulation , ViewChild, ElementRef} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../model/users';
import { UserService } from '../service/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]

})


export class LoginComponent implements OnInit {
  @ViewChild('loginalert') loginalert:ElementRef;
  public users: Users[];
  public userss_error: Boolean = false;
  public user = new Users();
  public alert = false;
  rForm: FormGroup;
  post:any;     
  email:string = '';                // A property for our submitted form
  password:string = '';

  formAlert:string = 'This Field is required';

 
  constructor(private http: Http,  
              private userService: UserService,
              private route: ActivatedRoute, 
              private router: Router, 
              private fb: FormBuilder
              )
  {
   
    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
   //   'password' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
     // 'submit':[null],
      'validate' : ''
    });

   }

  redirect() {
    this.router.navigate(['./dashboard']);
  }

  
  ngOnInit() {

    


  }




  userLogin(users: Users) {
 console.log(users['email']);
    this.alert = true;
  ////  this.password = post.password;
  //  this.name = post.username;
  //  alert(this.name);
    if(users['email']==null || users['email']=="")
    {
     
      console.log("email empty");
      this.formAlert;
      this.loginalert.nativeElement.innerHTML ="";
    }
  
   else if(users['password']==null || users['password']=="")
    {
      console.log("password empty");
      this.formAlert;
      this.loginalert.nativeElement.innerHTML ="";
    }
    else
    {




 this.userService.userLogin(users).subscribe(
  data =>
  {
    if(data==true)
    {
      this.router.navigate(['./dashboard']);
    }
    else
    {
      this.loginalert.nativeElement.innerHTML ="<div class='alert alert-danger'>Username or Password is Invalid</div>";
      console.log(data);
      return true;
    }
     
     
  },
  error => 
  {
      console.error("Error !");
      alert(error);
      console.log(error);
  }
);
   


}
    
  }



 
}
