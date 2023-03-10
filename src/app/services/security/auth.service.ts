import { Injectable } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { StorageService } from '../util/storage.service';
import { ToolsService } from '../util/tools.service';
import { UsuarioDataModel } from '../../models/security/usuario.model';
import { LoginModel } from '../../models/security/login.model';
import { HttpClient } from '@angular/common/http';

const JWT_HELPER = new JwtHelperService();
const USER_DATA_KEY = environment.storageKeys.USER_DATA;
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public toolsSV: ToolsService,
    private storage: StorageService,
    private http: HttpClient,
  ) { 

  }

  async isAuthenticated(route: Route, segments: UrlSegment[]) {
    if (!environment.production) {
      console.info('Route -> ', route);
      console.info('Segments -> ', segments);
    }
    return await this.isAuthAction();
  }

  async getToken(): Promise<string> {
    let userData: UsuarioDataModel = await this.storage.get(USER_DATA_KEY);
    return userData ? userData.token : '';
  }


  async login(data: LoginModel): Promise<UsuarioDataModel | any | null> {
    return new Promise((resolve, reject) => {
      this.http.post(`${API_URL}login`, data).subscribe({next: ((resp: any) => {
        if (resp && resp.token) {
          this.storage.set(USER_DATA_KEY, resp);
          resolve(resp)
        } else {
          reject(null)
        }
      }), error: (err => {
        if (err.status === 0) {
          this.toolsSV.presentAlert('Problemas de Conexión', 'Verificar la conexión del sistema');
        } else {
          this.toolsSV.presentAlert(err.error.message, err.error.error);
        }
        reject(err);
      })})
    });
  }

  private isAuthAction(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const loading = await this.toolsSV.getLoading();
      const token = await this.getToken();
      if (token && token !== '') {
        if (JWT_HELPER.isTokenExpired(token)) {
          setTimeout(() => {
            loading.dismiss();
            this.logoutAction();
            resolve(false);
          }, 500);          
        } else {
          setTimeout(() => {
            loading.dismiss();
            resolve(true);
          }, 500);
        }
      } else {
        setTimeout(() => {
          loading.dismiss();
          this.logoutAction();
          resolve(false);
        }, 500);
      }  
    });
  }

  private async logoutAction() {
    await this.storage.delete(USER_DATA_KEY);
    this.toolsSV.navCtrl.navigateRoot('/login', {animated: true, replaceUrl: true});
  }
}
