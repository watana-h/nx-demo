/**
 * @name user-edit.component
 * @description 会社情報編集
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeaderService } from '../../shared/header/header.service';
import { FooterService } from '../../shared/footer/footer.service';
import { UsersService } from "../users.service";
import { UserItem, 
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemRequestBody,
         AppendUserItemResponseBody,
         UpdateUserItemRequestBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';
import { ErrorItem, ErrorTarget } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog.component';


@Component({
  selector: 'nx-demo-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  blnPassVisible = true;
  isUpdate = true;
  public user: UserItem = { id: "", company: "", email: "", telephone: "", address: "",
                            account: "", password: "", deleted: "" };
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService,
    private footer: FooterService,
    private service: UsersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    console.log('id:', paramId);

    // header,footer表示
    this.header.setVisible(true);
    this.header.setLogoutVisible(true);
    this.footer.setVisible(true);
  
    if (!paramId) {
      this.isUpdate = false;
      this.header.setTitle("契約会社管理 - 会社情報追加");
    } else {
      this.isUpdate = true;
      this.header.setTitle("契約会社管理 - 会社情報編集");
      this.id = paramId;

      this.service.getUser(this.id).subscribe(result => {
        console.log('status:', result.status);
        console.log('item:', result.item);
        if (result.item != undefined && result.status == 0) {

          this.user = result.item;
        } else {
          this.router.navigate(["error"],
                                {state: 
                                  {errorMessage: 
                                    (result.errmsg) ? result.errmsg 
                                                    : "対象IDデータが正しく取得できませんでした。",
                                   errorTarget: ErrorTarget.backend }});
        }
      });
    }
  }

  ngOnDestroy(): void {
    // header,footerデフォルトに戻す
    this.header.setVisible(true);
    this.footer.setVisible(true);
  }


  /**
   * @name openDeleteConfirmDialog
   * @description 削除確認ダイアログ表示
   */
  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: '削除確認',
        message: '対象データを削除してよろしいでしょうか？',
        buttonText: {
          ok: 'はい', cancel: 'いいえ'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // 削除実行を選択
        this.service.deleteUser(this.id).subscribe(response => {
          let dlgtitle = '処理結果';
          let dlgmessage = '対象項目の削除処理が正常終了しました。';

          if(response.status != 0) {
            dlgmessage = '対象項目の削除処理がエラー終了しました。';
          }
          this.dialog.open(AlertDialogComponent,{
            data:{
              title: dlgtitle,
              message: dlgmessage,
              buttonText: {
                cancel: 'OK'
              }
            },
          });
        });
        // 一覧画面に戻る
        this.router.navigate(["users/user-list"]);
      }
    });
  }

  /**
   * @name openUpdateConfirmDialog
   * @description 更新確認ダイアログ表示
   */
  openUpdateConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: '更新確認',
        message: '対象データを更新してよろしいでしょうか？',
        buttonText: {
          ok: 'はい', cancel: 'いいえ'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // 更新実行を選択
        const body: UpdateUserItemRequestBody = {
           item: this.user
        };
        this.service.updateUser(body).subscribe(response => {
          let dlgtitle = '処理結果';
          let dlgmessage = '対象項目の更新処理が正常終了しました。';

          if(response.status != 0) {
            dlgmessage = '対象項目の更新処理がエラー終了しました。';
          }
          this.dialog.open(AlertDialogComponent,{
            data:{
              title: dlgtitle,
              message: dlgmessage,
              buttonText: {
                cancel: 'OK'
              }
            },
          });
        });
        // 一覧画面に戻る
        this.router.navigate(["users/user-list"]);
      }
    });
  }


  /**
   * @name openAppendConfirmDialog
   * @description 追加確認ダイアログ表示
   */
  openAppendConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: '追加確認',
        message: '対象データを追加してよろしいでしょうか？',
        buttonText: {
          ok: 'はい', cancel: 'いいえ'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // 追加実行を選択
        const body: AppendUserItemRequestBody = {
           item: this.user
        };
        this.service.appendUser(body).subscribe(response => {
          let dlgtitle = '処理結果';
          let dlgmessage = '対象項目の追加処理が正常終了しました。';

          if(response.status != 0) {
            dlgmessage = '対象項目の更新処理がエラー終了しました。';
          }
          this.dialog.open(AlertDialogComponent,{
            data:{
              title: dlgtitle,
              message: dlgmessage,
              buttonText: {
                cancel: 'OK'
              }
            },
          });
        });
        // 一覧画面に戻る
        this.router.navigate(["users/user-list"]);
      }
    });
  }

  /**
   * @name openNotSupportedDialog
   * @description 未サポートダイアログ表示
   */
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

}
