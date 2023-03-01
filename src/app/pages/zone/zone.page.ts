import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';
import { UsuarioDataModel } from '../../models/security/usuario.model';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.page.html',
  styleUrls: ['./zone.page.scss'],
})
export class ZonePage implements OnInit {

  token: UsuarioDataModel | any;

  constructor(private authSV: AuthService) { 
    authSV.getUsuarioData().then(d => this.token = d);
  }

  ngOnInit() {
  }

}
