import { Component, OnInit, ViewEncapsulation,ViewChild,ElementRef  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../model/users';
import { UserService } from '../service/service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

  public users: Users[];
  public userss_error: Boolean = false;
  public user = new Users();
  public alert = false;
  rForm: FormGroup;
  post:any;                     
  password:string = '';
  name:string = '';
  
  formAlert:string = 'This Field is required';

  constructor(private http: Http,  
              private userService: UserService,
              private route: ActivatedRoute, 
              private router: Router, 
              private fb: FormBuilder)
              { 
                this.rForm = fb.group({
                'name' : [null, Validators.required],
                'email' : [null, Validators.required],
                
              }
              );

             }

  ngOnInit() {
  }
  resetform()
  {
    this.rForm.reset();
  }

  addPost(users: Users) {
    this.alert = true;
    
    if(users['name']==null )
    {
     
      this.formAlert;
    }
  
    else if(users['email']==null )
    {
     
      this.formAlert;
    }
    else
    {
    this.userService.addProduct(users).subscribe(
        data =>
        {
          
            alert('User Added Successfully!');
            this.resetform();
            this.alert = false;
            this.router.navigate(['userdetails']);
            return true;
           
        },
        error => 
        {
            console.error("Error saving User!");
            alert(error);
            console.log(error);
        }
    );

    
    }

    


}

}
