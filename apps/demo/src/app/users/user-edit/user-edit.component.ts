import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersService } from "../users.service";
import { UserItem } from '@nx-demo/api-interfaces';
import { AlertDialogComponent } from "../../shared/dialog/alert-dialog.component";

@Component({
  selector: 'nx-demo-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user: UserItem = { company: "", email: "", telephone: "", address: "",
                            id: "", account: "", password: "" };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const company = this.route.snapshot.paramMap.get('company');
    console.log('company:', company);

    if (company) {
      this.service.getUser(company)
      .subscribe(result => this.user = result);
    }
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
