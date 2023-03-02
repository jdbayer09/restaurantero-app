import { Component, OnInit } from '@angular/core';
import { storageKeys } from 'src/environments/storage-keys';
import { StorageService } from '../../../services/util/storage.service';
import { AuthService } from '../../../services/security/auth.service';
import { ToolsService } from '../../../services/util/tools.service';

const DARK_MODE_KEY = storageKeys.MODO_OSCURO;

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;
  modoOscuroClass: boolean = false;

  constructor(
    private str: StorageService, 
    private authSV: AuthService, 
    private toolSV: ToolsService
  ) { }

  ngOnInit() {
    this.str.get(DARK_MODE_KEY).then((resp: boolean) => {
      this.modoOscuro = resp;
      this.modoOscuroClass = resp;
    });
  }

  cambiarModoOscuro() {
    this.str.set(DARK_MODE_KEY, !this.modoOscuro);    
    window.location.reload();
  }

  async cerrarSesionAction() {
    const loading = await this.toolSV.getLoading();
    setTimeout(() => {
      this.authSV.logoutAction();
      loading.dismiss();
    }, 1500);
  }
}
