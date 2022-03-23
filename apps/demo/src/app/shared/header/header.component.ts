import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';

@Component({
  selector: 'nx-demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public header: HeaderService) { }

  ngOnInit(): void { }
}
