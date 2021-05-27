import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { IonicAlertService } from '../services/ionic-alert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Product } from '../model/product.model';
import { UnidadeMedida } from '../enums/unidade-medida.enum';
import { Observable } from 'rxjs';


import { map } from 'rxjs/operators';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  $key: string;
  productList: any[] = [];
  productListBackup: any[] = [];
  product: Product;
  productForm: FormGroup;
  unidadeMedida = UnidadeMedida;

  constructor(private firebaseService: FirebaseService, private alertService: IonicAlertService, public fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      quantidade: [null, [Validators.required]],
      unidadeMedida: [null, [Validators.required]],
    });
    this.refreshList();
  }

  refreshList(){
    this.firebaseService.read_products().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({$key: c.payload.key, isEdit:false, ...c.payload.val()}))
      )
    ).subscribe(data => {
        this.productList = data; 
        this.productListBackup = this.productList;
        console.log(this.productList);
    });
  }

  async filterList(evt) {
    this.productList = this.productListBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.productList = this.productList.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  createProduct() {
    if (this.$key){
      console.log("atualziand");
      this.firebaseService.update_product(this.$key, this.productForm.value).then(resp => {
        this.productForm.reset();
        this.$key = null;
      }).catch(error => {
          console.log(error);
      });
    } else {
      this.firebaseService.create_product(this.productForm.value).then(resp => {
        this.productForm.reset();
      }).catch(error => {
          console.log(error);
      });
    }
  }

  searchProduct(name:string) {
    /*
    this.firebaseService.search_products(name).snapshotChanges().subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        a['isEdit'] = false;
        this.productList.push(a as Product);
      })
    });*/
  }

  removeProduct(rowID, key) {
    this.alertService.create({
      header: 'AVISO',
      message: 'Deseja realmente excluir o item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.firebaseService.delete_product(key).then(resp => {
            }).catch(error => {
            });
          }
        }
      ]
    });
  }

  editProduct(id) {
    if (id){
      this.firebaseService.get_product(id).snapshotChanges().subscribe(res => {
        if (res.payload.exists()){
          this.product = res.payload.toJSON() as Product;
          this.productForm.setValue(this.product);
          this.$key = res.key;
          console.log(this.product);
          console.log(this.$key);
        }
      })
    }
  }
}
