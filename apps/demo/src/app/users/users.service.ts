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

  getUser(id: string | null): Observable<UserItem> {
     return this.http.get<UserItem>(`/api/users/${id}`);
  }

/***
  setUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users', user);
  }

  updateUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users/${user.company}', user);
  }

  deleteUser(user: UserItem): Observable<UserItem> {
    return this.http.delete<UserItem>('/api/users/${user.company}');
  }
***/

}
