/**
 * @name footer.component
 * @description 共通フッタ
*/
import { Component, OnInit } from '@angular/core';

import { FooterService } from './footer.service';

@Component({
  selector: 'nx-demo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // メンバー変数 (const, let などの指定不可)
  footerVisible: boolean = false; 

  constructor(
    private footer: FooterService) { }

  ngOnInit(): void {
    this.footer.visible.subscribe(updatedValue => this.footerVisible = updatedValue);
  }

}
