import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { shareReplay } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { Users } from '../model/Users';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';




@Injectable(
 { providedIn: 'root'}
  )
export class UserService {

  constructor(private http: Http) { }


  userLogin(Users) 
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(Users);
    return this.http.post('http://127.0.0.1:8000/api/login', body, options).map((res: Response) => res.json());
  }

  addProduct(Users) 
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(Users);
    return this.http.post('http://127.0.0.1:8000/api/register', body, options).map((res: Response) => res.json());
  }

  public getAllUsers()
   {
    return this.http.get('http://127.0.0.1:8000/api/getall').map((res: Response) => <Users[]>res.json())
   }

   public getUserById(id)
   {
    return this.http.get('http://127.0.0.1:8000/api/getbyid/'+id).map((res: Response) => <Users[]>res.json())
   }


   deleteUser(user) 
   {
    return this.http.delete('http://127.0.0.1:8000/api/delete/' + user.id);
   }

   updateUser(user,id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.put('http://127.0.0.1:8000/api/update/'+id, body, options).map((res: Response) => res.json()); 
    // return this.http.put('http://127.0.0.1:8000/api/update/' + product.Id, body, options).map((res: Response) => res.json());

    }



}
