import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.page.html',
  styleUrls: ['./zone.page.scss'],
})
export class ZonePage implements OnInit {

  token = '';

  constructor(private authSV: AuthService) { 
    authSV.getToken().then(d => this.token = d);
  }

  ngOnInit() {
  }

}
