/**
 * @name footer.service
 * @description フッタ部表示/非表示
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  // メンバー変数 (const, let などの指定不可)
  visible = new BehaviorSubject(false);

  constructor() { }

  // フッタ表示/非表示
  setVisible(isVisible: boolean) {
    this.visible.next(isVisible);
  }

 }
