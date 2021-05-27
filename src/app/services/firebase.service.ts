import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Product } from '../model/product.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  productListRef: AngularFireList<Product>;
  productRef: AngularFireObject<Product>;
  private dbPath = '/products';

  constructor(private db: AngularFireDatabase) {
    this.productListRef = this.db.list(this.dbPath);
  }

  create_product(record:Product) {
    return this.productListRef.push(record).then((result: any) => console.log(result.key));
  }

  
  get_product(id: string) : AngularFireObject<Product> {
    this.productRef = this.db.object('/products/' + id) as AngularFireObject<Product>;
    return this.productRef;
  }

  read_products() {
    return this.productListRef;
  }
  
  getAll() {
    return this.productListRef;
    /*
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {return Object.assign({$key: c.payload.key}, c.payload.val())});
        })
      );*/
  }

  /*
  search_products(name:string) {
    this.productListRef = this.db.list('/products');
    this.productListRef.query.orderByChild('name').equalTo(name);
    return this.productListRef;
  }*/

  update_product(recordID, record:Product) : Promise<void> {
    return this.productListRef.update(recordID, record).catch((error: any) => console.log(error));
  }

  update(record:Product) : Promise<void> {
    return this.productRef.update(record).catch((error: any) => console.log(error));
  }

  delete_product(record_id) : Promise<void> {
    return this.productListRef.remove(record_id);
  }

  delete_all() : Promise<void> {
    return this.productListRef.remove();
  }
}
