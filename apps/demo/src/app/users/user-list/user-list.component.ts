// 雛形で生成されたので不要
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';

import { UsersService } from "../users.service";
// import { UserIItem } from '@nx-demo/api-interfaces';

@Component({
  selector: 'nx-demo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["company", "email", "telephone", "address"];
  dataSource = new MatTableDataSource<any>([]);
  
  constructor(private service: UsersService){}

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit() {
    this.service.getUsers().subscribe((responce) => {
      this.dataSource = new MatTableDataSource(responce);
      this.dataSource.sort = this.sort;
    });
  }
}
