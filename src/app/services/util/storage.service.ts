import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = new BehaviorSubject(false);

  constructor(
    private storage: Storage
  ) { 
    this.iniciar();
  }

  private async iniciar() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
  }

  set(key: string, value: any) {
    return new Promise(resolve => {
      this.setValue(key, value).subscribe(resp => {
        resolve(resp);
      });
    });
  }

  delete(key: string) {
    return new Promise(resolve => {
      this.deleteValue(key).subscribe(resp => {
        resolve(resp);
      });
    });
  }

  get(key: string): Promise<any> {
    return new Promise(resolve => {
      this.getValue(key).subscribe(resp => {
        resolve(resp);
      });
    });
  }
  


  private setValue(key: string, value: any) {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap( () => {
        return from(this.storage.set(key, value)) || of(null);
      })
    );
  }

  private deleteValue(key: string) {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap( () => {
        return from(this.storage.remove(key)) || of(null);
      })
    );
  } 

  private getValue(key: string) {
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap( () => {
        return from(this.storage.get(key)) || of(null);
      })
    );
  }
}
