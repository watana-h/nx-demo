/**
 * @name footer.service
 * @description フッタ部表示/非表示
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  visible: boolean;
  constructor() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
 }
