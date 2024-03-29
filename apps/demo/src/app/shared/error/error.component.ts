/**
 * @name error.component
 * @description エラー表示画面
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';

import { ErrorTarget, errorTargetTbls, errorResponseTbls } from '@nx-demo/api-interfaces';
import { HeaderService } from '../header/header.service';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'nx-demo-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  // メンバー変数 (const, let などの指定不可)
  eno?: number;
  message = '原因不明の障害です。サポートセンターにご連絡ください。';
  target: string = ErrorTarget.other
  headerTitle = "契約会社管理";

  constructor(
    private header: HeaderService,
    private footer: FooterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.router?.getCurrentNavigation()?.extras.state) {
      // http-error.interceptor 経由
      console.log('router.navigate ...');
      const routeState = this.router?.getCurrentNavigation()?.extras.state;
      console.log(routeState);
      if (routeState){
        const stateCode = routeState['errorCode'];
        if (stateCode) {
            this.eno = Number(stateCode);
        }

        // 条件分岐省略
        // if (hoge) { bar = hoge; } else { bar = 'empty'; }
        // ↓
        // bar = hoge || 'empty';

        this.message = routeState['errorMessage'] || this.message;
        this.target = routeState['errorTarget'] || this.target;
      }
    } else {
      // app-routing 経由
      this.route.data.subscribe((data: Data) => {
        console.log('app-routing parameters...');
        console.log(data);
  
        this.eno = data['errorCode']; 
        this.message = data['errorMessage'];
        this.target = data['errorTarget'] || this.target;
      });
    }
  }

  ngOnInit(): void {
    const targetTitle: string|undefined = errorTargetTbls.find(item => item.id == this.target)?.title;
    this.headerTitle = targetTitle || this.headerTitle;

    if (this.eno) {
      const enoMessage: string|undefined = errorResponseTbls.find(item => item.code == this.eno)?.title;
      this.message = enoMessage || this.message;
    }

    // header,footer表示
    this.header.setVisible(true);
    this.header.setTitle(this.headerTitle);
    this.header.setLogoutVisible(false);
    this.footer.setVisible(true);
  }

  ngOnDestroy(): void {
    // header,footerデフォルトに戻す
    this.header.setVisible(true);
    this.header.setLogoutVisible(true);
    this.footer.setVisible(true);
  }

  /**
   * @name closeWindow
   * @description アプリを閉じる
   */
  closeWindow() {
    console.log('closeWindow()');
    window.open('about:blank', '_self')?.close();
 // window.close();
  }

}
