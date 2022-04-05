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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public header: HeaderService) { }

  ngOnInit(): void { }

}
