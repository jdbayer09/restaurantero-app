import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    login: [ '' , [Validators.required, Validators.minLength(3)] ],
    contrasena: [ '', [ Validators.required, Validators.minLength(5) ] ]
  });;

  constructor(
    private authSV: AuthService, 
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { 
    
  }

  async onSubit() {
    if (this.loginForm.invalid) return;
    const loading = await this.authSV.toolsSV.getLoading();
    setTimeout(() => {
      this.authSV.login({ ...this.loginForm.value, plataforma: 'APP' }).then(resp => {
        if (resp) {
          this.loginForm.reset();
          this.navCtrl.navigateRoot('/z', {animated: true});
        }        
      }).catch(() => 
        this.loginForm.reset()
      ).finally(() => loading.dismiss());
    }, 1000);
  }

  ngOnInit() {

  }
}
