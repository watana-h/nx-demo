/**
 * @name header.component
 * @description 共通ヘッダ
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderService } from './header.service';

@Component({
  selector: 'nx-demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerTitle = "受発注管理";
  headerVisible: boolean = false; 
  logoutVisible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private header: HeaderService) { }

  ngOnInit(): void {
    this.header.title.subscribe(updatedValue => this.headerTitle = updatedValue);
    this.header.visible.subscribe(updatedValue => this.headerVisible = updatedValue);
    this.header.isLogout.subscribe(updatedValue => this.logoutVisible = updatedValue);
  }

}
