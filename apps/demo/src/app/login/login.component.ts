/**
 * @name login.component
 * @description ログイン画面
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LoginParam, AuthLoginRequestBody  } from '@nx-demo/api-interfaces';
import { HeaderService } from '../shared/header/header.service';
import { FooterService } from '../shared/footer/footer.service';
import { LoginService } from './login.service';

@Component({
  selector: 'nx-demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // メンバー変数 (const, let などの指定不可)
  title = "ログインページ";
  errors: string[] = [];
  blnPassVisible = true;
  blnLoading = false;
  strLoadingMsg = "ログイン処理中です";
  loginForm: FormGroup;
  loginParam: LoginParam = {user: "", password: ""};
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService,
    private footer: FooterService,
    private service: LoginService,
    private fb: FormBuilder
  ) {
    // 正規表現:「半角英数字と一部記号(.@_-)」
    const ptnAnk  = "^[a-zA-Z0-9\.@_-]+$";

    // FormGroup
    this.loginForm = fb.group({
      user:['',                        // 初期値
        [Validators.required,          // バリデーター: 必須項目
         Validators.pattern(ptnAnk)]], // バリデーター: 利用可能文字パターン
      password:['',                    // 初期値
        [Validators.required,          // バリデーター: 必須項目
         Validators.pattern(ptnAnk),   // バリデーター: 利用可能文字パターン
         Validators.minLength(6),      // バリデーター: 最小文字数
         Validators.maxLength(30)]],   // バリデーター: 最大文字数
    });
  }

  login(): void {
    const loginParam: LoginParam = { user: this.loginForm.value.user,
                                     password: this.loginForm.value.password };
    //エラー配列クリア
    this.errors = [];

    if (loginParam.user === '') this.errors.push("ユーザー名を空白にはできません");
    if (loginParam.password === '') this.errors.push("パスワードを空白にはできません");
          
    //この段階でエラーなら戻る
    if (0 < this.errors.length) {
      return;
    }

    // ウェイト画面
    this.blnLoading = true;

    const body: AuthLoginRequestBody = { param: loginParam };
    this.service.authLogin(body).subscribe(response => {
      if (response.result) {
        // スリープ(800ms)後に処理実施
        const delay_observable = of('').pipe(delay(800));
        delay_observable.subscribe(s => {
          // ユーザ一覧ページに遷移
          this.router.navigateByUrl('/users/user-list');
        });
      } else {
        this.errors.push("ユーザー名とパスワードが同一文字列のため認証エラー");
        this.blnLoading = false;
      }
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
