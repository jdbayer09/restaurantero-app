import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/util/storage.service';
import { storageKeys } from '../../../environments/storage-keys';

const DARK_MODE_KEY = storageKeys.MODO_OSCURO;

@Component({
  selector: 'app-zone',
  templateUrl: './zone.page.html',
  styleUrls: ['./zone.page.scss'],
})
export class ZonePage implements OnInit {

  modoOscuro: boolean = false;

  constructor(private str: StorageService) { 
  }

  ngOnInit() {
    this.str.get(DARK_MODE_KEY).then((resp: boolean) => {
      this.modoOscuro = resp;
    });
  }

}
