// 雛形で生成されたので不要
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeaderService } from '../../shared/header/header.service';
import { FooterService } from "../../shared/footer/footer.service";
import { UsersService } from "../users.service";
import { UserItem } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";

@Component({
  selector: 'nx-demo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["id", "company", "email", "telephone", "address"];
  dataSource = new MatTableDataSource<UserItem>([]);
  
  constructor(
    private header: HeaderService,
    private footer: FooterService,
    private service: UsersService,
    private dialog: MatDialog){}

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit(): void {
    // header,footer表示
    this.header.show();
    this.header.setTitle("受発注管理 - アカウント一覧");
    this.footer.show();

    this.service.getUsers().subscribe((responce) => {
      this.dataSource = new MatTableDataSource(responce);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    // header,footerデフォルトに戻す
    this.header.show();
    this.footer.show();
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
