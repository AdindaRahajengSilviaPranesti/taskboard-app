import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User[]>(this.apiUrl).pipe(

      map(users => {

        const user = users.find(u =>
          u.email === email &&
          u.password === password
        );

        if (!user) {
          throw new Error('Email atau password salah');
        }

        localStorage.setItem(
          'currentUser',
          JSON.stringify(user)
        );

        return user;

      })

    );

  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {

    const data = localStorage.getItem('currentUser');

    if (!data) {
      return null;
    }

    return JSON.parse(data);

  }

}