import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular5';
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';

  constructor(router:Router, private fb: FormBuilder) {
    router.navigate(['/login']);

   this.rForm = fb.group({
    'name' : [null, Validators.required],
    'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    'validate' : ''
  });

  }


  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }
  
}
