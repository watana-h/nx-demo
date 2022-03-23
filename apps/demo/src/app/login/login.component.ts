import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthParam } from '@nx-demo/api-interfaces';
import { HeaderService } from '../shared/header/header.service';
import { FooterService } from '../shared/footer/footer.service';

@Component({
  selector: 'nx-demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  title="ログインページ";
  errors: string[]=[];
  blnPassVisible = true;
  auth: AuthParam = {user: "", password: ""};

  // blnLoading: boolean = false;
  // strLoadingMsg: string = "ログイン処理中です";
    
  loginForm = this.fb.group({
    user:[''],
    password:[''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService,
    private footer: FooterService,
    private fb: FormBuilder ) { }

    login(): void {
      //エラー配列クリア
      this.errors = [];

      if (this.loginForm.value.user==='') this.errors.push("ユーザー名を空白にはできません");
      if (this.loginForm.value.password==='') this.errors.push("パスワードを空白にはできません");
          
      //この段階でエラーなら戻る
      if (0 < this.errors.length) {
        return;
      }

      // ユーザ一覧ページに遷移
      this.router.navigateByUrl('/users/user-list');
   }

    ngOnInit(): void {
      // header,footer非表示
      this.header.hide();
      this.footer.hide();
    }

    ngOnDestroy(): void {
      // header,footerデフォルトに戻す
      this.header.show();
      this.footer.show();
    }

}