import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  currentUserValue: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

    getAll() {
      return this.http.get<User[]>(`${environment.baseUrl}/auth/users`);
    }

    register(user: User) {
      return this.http.post(`${environment.baseUrl}/auth/signup`, user);
    }

    delete(id: number) {
      return this.http.delete(`${environment.baseUrl}/auth/me/${id}`);
    }

    login(username: any, password: any) {
      return this.http
        .post<any>(`${environment.baseUrl}/auth/signin`, { username, password })
        .pipe(
          map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          })
        );
    }
  
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null!);
    }
}
