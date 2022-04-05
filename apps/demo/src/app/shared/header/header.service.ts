/**
 * @name header.service
 * @description ヘッダ部表示/非表示、タイトル設定
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  visible: boolean;
  title: string;

 constructor() {
   this.visible = true;
   this.title = "受発注管理";
  }

  hide() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
  setTitle(title: string) {
    this.title = title;
  }
}
