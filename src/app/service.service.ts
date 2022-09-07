import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, Country } from 'src/app/app.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  usersSubject: BehaviorSubject<User> = new BehaviorSubject(new User);
  usersList: User[] = [];

  constructor(private _http: HttpClient) { }

  // Регистирање на нов корисник
  registerUser(newUser: User) {

    // Додади го новиот регистриран корисник во листата
    this.usersList.push(newUser);

  };


  getCountry(): Observable<Country[]>
  {
    return this._http.get<Country[]>('http://api.interns.techup.me/country');
  }


  createUser(newUser: User): Observable<any>
  {
    return this._http.post<any>('http://api.interns.techup.me/user/create', newUser);
  }
}



