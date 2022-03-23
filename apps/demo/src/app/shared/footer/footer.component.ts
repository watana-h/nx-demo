import { Component, OnInit } from '@angular/core';

import { FooterService } from './footer.service';

@Component({
  selector: 'nx-demo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public footer: FooterService) { }

  ngOnInit(): void {
  }

}
