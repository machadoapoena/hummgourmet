import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IonicAuthService {

  firebaseErrors = {
    'auth/user-not-found': 'Usuário não cadastrado.',
    'auth/wrong-password': 'Senha inválida para o usuário.',
    'auth/too-many-requests': 'Acesso temporariamente desativado devido várias tentativas de login. Você pode resetar imediatamente sua senha ou tentar novamente depois.'
  };

  currentUser: any;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  createUser(email:string, password:string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(this.firebaseErrors[err.code] || err.message))
    })
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            //localStorage.removeItem('user');
            //this.router.navigate(['login']);
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  passwordRecover(passwordResetEmail) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  userDetails() {
    return this.currentUser;
  }
}
