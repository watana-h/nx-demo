/**
 * @name user-list.component
 * @description 会社情報一覧
*/
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeaderService } from '../../shared/header/header.service';
import { FooterService } from "../../shared/footer/footer.service";
import { UsersService } from "../users.service";
import { UserItem, GetUserItemArrayResponseBody } from '@nx-demo/api-interfaces';
import { ErrorItem, ErrorTarget } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";

@Component({
  selector: 'nx-demo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  // メンバー変数 (const, let などの指定不可)
  displayedColumns: string[] = ["id", "company", "email", "telephone", "address"];
  dataSource = new MatTableDataSource<UserItem>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService,
    private footer: FooterService,
    private service: UsersService,
    private dialog: MatDialog){}

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit(): void {
    // header,footer表示
    this.header.setVisible(true);
    this.header.setTitle("契約会社管理 - 会社情報一覧");
    this.header.setLogoutVisible(true);
    this.footer.setVisible(true);

    // paginator日本語化
    this.paginator._intl.itemsPerPageLabel = '表示件数';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) { return `${length} 件中 0`; }

      length = Math.max(length, 0);
      const startIndex: number = page * pageSize;
      const endIndex: number = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
      return `${length} 件中 ${startIndex + 1} - ${endIndex}`;
    }

    // ユーザ一覧取得
    this.service.getUsers().subscribe(result => {
      console.log('status:', result.status);
      if (result.status == 0) {
        // deleted="1"を除外
        const enabledItem = result.item?.filter(function(item) {
          return item.deleted != "1";
        });
        this.dataSource = new MatTableDataSource(enabledItem);
      } else {
          this.router.navigate(["error"],
                                {state:
                                  {errorMessage:
                                    (result.errmsg) ? result.errmsg
                                                    : "データが正しく取得できませんでした。",
                                   errorTarget: ErrorTarget.backend }});
      }
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
    this.header.setVisible(true);
    this.header.setVisible(true);
  }

  /**
   * @name addUser
   * @description 会社情報追加
   */
  addUser() {
    this.router.navigate(["users/user-edit"]);
  }

  /**
   * @name openNotSupportedDialog
   * @description 未サポートダイアログ表示
   */
/*** Un Used ****
  openNotSupportedDialog() {
 // const dialogRef = this.dialog.open(AlertDialogComponent,{
    this.dialog.open(AlertDialogComponent,{
      data:{
        title: '警告',
        message: '本機能は現状未サポートです。',
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }
**** Un Used ***/

}
