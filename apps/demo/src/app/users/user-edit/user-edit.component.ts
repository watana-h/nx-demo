import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeaderService } from '../../shared/header/header.service';
import { FooterService } from '../../shared/footer/footer.service';
import { UsersService } from "../users.service";
import { UserItem } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";


@Component({
  selector: 'nx-demo-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  blnPassVisible = true;
  public user: UserItem = { company: "", email: "", telephone: "", address: "",
                            id: "", account: "", password: "" };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService,
    private footer: FooterService,
    private service: UsersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    // header,footer表示
    this.header.show();
    this.header.setTitle("受発注管理 - アカウント編集");
    this.footer.show();
  
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);

    if (id) {
      this.service.getUser(id)
      .subscribe(result => this.user = result);
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
