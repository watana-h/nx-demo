import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItem } from '@nx-demo/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserItem[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>('/api/users');
  }

/***
  getUser(name: string): Observable<UserItem> {
    return this.http.get<UserItem>('/api/users/${name}');
  }

  setUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users', user);
  }

  updateUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users/${name}', user);
  }

  deleteUser(user: UserItem): Observable<UserItem> {
    return this.http.delete<UserItem>('/api/users/${user.company}');
  }
***/

}
