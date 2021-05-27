import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consumer } from '../model/consumer.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-consumidor',
  templateUrl: './consumidor.page.html',
  styleUrls: ['./consumidor.page.scss'],
})
export class ConsumidorPage implements OnInit {

  consumerList: any[] = [];
  consumerListBackup: any[] = [];

  constructor(private firebaseService: FirebaseService, public fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.consumerList.push({
          name: 'Apoena Oliveira Machado', 
          email: 'machadoapoena@gmail.com', 
          mobileNumber: '61981222312', 
          address: 'Rua 21 Norte Lote 1 Ap 1203 Ed Le Grand Valle', 
          qtdOrder: 3, 
          moneySpend: 250.0
      });
      this.consumerList.push({
        name: 'Rosmari Mazzochin', 
        email: 'rosi.mzz@gmail.com', 
        mobileNumber: '61981773796', 
        address: 'Rua 21 Norte Lote 1 Ap 1203 Ed Le Grand Valle', 
        qtdOrder: 20, 
        moneySpend: 932.0
    })
    this.consumerList.push({
      name: 'Rosmari Mazzochin', 
      email: 'rosi.mzz@gmail.com', 
      mobileNumber: '61981773796', 
      address: 'Rua 21 Norte Lote 1 Ap 1203 Ed Le Grand Valle', 
      qtdOrder: 20, 
      moneySpend: 932.0
  })
  this.consumerList.push({
    name: 'Rosmari Mazzochin', 
    email: 'rosi.mzz@gmail.com', 
    mobileNumber: '61981773796', 
    address: 'Rua 21 Norte Lote 1 Ap 1203 Ed Le Grand Valle', 
    qtdOrder: 20, 
    moneySpend: 932.0
})
  }

}
