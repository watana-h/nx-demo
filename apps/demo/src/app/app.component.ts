import { Component } from '@angular/core';

//  雛形で生成されたので不要 
// import { HttpClient } from '@angular/common/http';
// import { Message } from '@nx-demo/api-interfaces';

@Component({
  selector: 'nx-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nx-demo';
//  雛形で生成されたので不要 
//  hello$ = this.http.get<Message>('/api/hello');
//  constructor(private http: HttpClient) {}
}
