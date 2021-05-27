import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonicToastService } from '../services/ionic-toast.service';

import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  userForm: FormGroup;
  errorMsg: string = '';

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 6 characters long.' 
      }
    ]
  };

  constructor(private router: Router, private ionicAuthService: IonicAuthService, private fb: FormBuilder, private ionicToastService: IonicToastService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  logIn(user:User) {
    this.ionicAuthService.signinUser(user)
      .then((response) => {
        //this.router.navigate(['folder/Inbox']);
        this.router.navigate(['produto']);
      }, error => {
        this.ionicToastService.showToastWithConfig({
          message: error,
          position: 'bottom',
          color: 'dark',
          //cssClass: 'toast-custom-class',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      })
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }
}
