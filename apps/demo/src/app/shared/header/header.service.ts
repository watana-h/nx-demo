/**
 * @name header.service
 * @description ヘッダ部表示/非表示、タイトル設定
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // メンバー変数 (const, let などの指定不可)
  visible  = new BehaviorSubject(false);
  isLogout  = new BehaviorSubject(true);
  title  = new BehaviorSubject("受発注管理");

  constructor() {
    // 何もしない
  }

  // タイトル文字列設定
  setTitle(title: string) {
    this.title.next(title);
  }

  // ヘッダ表示/非表示
  setVisible(isVisible: boolean) {
    this.visible.next(isVisible);
  }

  // ログアウト表示/非表示
  setLogoutVisible(isVisible: boolean) {
    this.isLogout.next(isVisible);
  }

}

