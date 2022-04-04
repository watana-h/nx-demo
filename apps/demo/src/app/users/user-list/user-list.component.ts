// 雛形で生成されたので不要
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
// import { FormControl } from "@angular/forms";

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
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

    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit(): void {
    // header,footer表示
    this.header.show();
    this.header.setTitle("受発注管理 - アカウント一覧");
    this.footer.show();
    // paginator日本語化
    this.paginator._intl.itemsPerPageLabel = '表示件数';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) { return `${length} 件中 0`; }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
      return `${length} 件中 ${startIndex + 1} - ${endIndex}`;
    }

    this.service.getUsers().subscribe((responce) => {
      this.dataSource = new MatTableDataSource(responce);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    // 検索フィルタの対象項目を id に限定
    // this.dataSource.filterPredicate =
    //   (users: UserItem, filter: string) => users.id.indexOf(filter) != -1;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      // 先頭頁に戻す
      this.dataSource.paginator.firstPage();
    }
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
