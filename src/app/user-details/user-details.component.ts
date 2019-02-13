import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';//PrimeNg
import { Users } from '../model/users';
import { UserService } from '../service/service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss',
              "../../../node_modules/primeng/resources/primeng.min.css",
              "../../../node_modules/primeng/resources/themes/omega/theme.css",
             ],
             encapsulation: ViewEncapsulation.None,
             providers: [UserService]           
})
export class UserDetailsComponent implements OnInit {

  public users: Users[];
  public users_error: Boolean = false;
  public user = new Users();
  public isLoadingData: Boolean = false;
  constructor(private http: Http,  
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() 
  {
    this.getAllusers();
  }

  public getAllusers() {
    this.isLoadingData = true;

    this.userService.getAllUsers()
        .subscribe(
        data => {
      //    console.log(data);
            this.users = data;
        },
        error => {
            console.log(error),
                this.isLoadingData = false;
        },
        () => {
            this.isLoadingData = false;
        });
}


deleteUser(_user: Users)
{
  if (confirm("Are you sure you want to delete  user ?"))
   {
      this.userService.deleteUser(_user).subscribe(
          data => {
              // refresh the list
              alert('User Deleted Successfully!');
              this.getAllusers();
              return true;
          },
          error => {
              this.isLoadingData = false;
              console.error("Error deleting user!");
              alert(error);
          },
          () =>
          {
              this.isLoadingData = false;
          }
      );
  }
}

}
