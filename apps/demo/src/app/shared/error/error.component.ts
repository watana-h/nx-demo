/**
 * @name error.component
 * @description エラー表示画面
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { FooterService } from '../footer/footer.service';
import { ErrorTarget, errorTargetTbls, errorResponseTbls, ErrorItem } from '@nx-demo/api-interfaces';

const baseMessage = '原因不明の障害です。サポートセンターにご連絡ください。';
const baseTarget = ErrorTarget.other;

@Component({
  selector: 'nx-demo-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  eno?: number;
  message = baseMessage;
  target = baseTarget;
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
        this.target = data['errorTarget'] ? data['errorTarget'] : baseTarget;
      })
    }
  }

  ngOnInit(): void {
    const targetTitle = errorTargetTbls.find(item => item.id == this.target)?.title;
    if (targetTitle !== undefined) {
      this.headerTitle = targetTitle;
    }
    if (this.eno) {
      const enoMessage = errorResponseTbls.find(item => item.code == this.eno)?.title;
      if (enoMessage !== undefined) {
        this.message = enoMessage;
      }
    }
    if (!this.message) {
      console.log('massage default');
      this.message = baseMessage;
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
