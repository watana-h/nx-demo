// 雛形で生成されたので不要
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersService } from "../users.service";
import { UserItem } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";

@Component({
  selector: 'nx-demo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["company", "email", "telephone", "address"];
  dataSource = new MatTableDataSource<UserItem>([]);
  
  constructor(
    private service: UsersService,
    private dialog: MatDialog){}

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit() {
    this.service.getUsers().subscribe((responce) => {
      this.dataSource = new MatTableDataSource(responce);
      this.dataSource.sort = this.sort;
    });
  }

  openNotSupportedDialog() {
 // const dialogRef = this.dialog.open(AlertDialogComponent,{
    this.dialog.open(AlertDialogComponent,{
      data:{
        message: '本機能は現状未サポートです。',
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }

}
