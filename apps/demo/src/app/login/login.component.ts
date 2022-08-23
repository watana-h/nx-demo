/**
 * @name login.component
 * @description ログイン画面
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  blnLoading = false;
  strLoadingMsg = "ログイン処理中です";
  ptnAnk = "^[a-zA-Z0-9\.@_-]+$";          // 半角英数字と一部記号(.@_-)
    
  loginForm = this.fb.group({
    user:['',
        [Validators.required,
         Validators.pattern(this.ptnAnk)]],
    password:['',
        [Validators.required,
         Validators.pattern(this.ptnAnk),
         Validators.minLength(6),
         Validators.maxLength(30)]],
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

      // ウェイト画面
      this.blnLoading = true;

      // スリープ(800ms)後に処理実施
      const delay_observable = of('').pipe(delay(800));
      delay_observable.subscribe(s => {
        // ユーザ一覧ページに遷移
        this.router.navigateByUrl('/users/user-list');
      });
   }

    ngOnInit(): void {
      // header,footer非表示
      this.header.setVisible(false);
      this.footer.setVisible(false);
    }

    ngOnDestroy(): void {
      // header,footerデフォルトに戻す
      this.header.setVisible(true);
      this.footer.setVisible(true);
    }

}
