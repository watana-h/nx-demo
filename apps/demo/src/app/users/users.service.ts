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
}
