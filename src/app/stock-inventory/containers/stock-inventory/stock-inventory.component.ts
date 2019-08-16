import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models/product.interface';
import {StockInventoryService} from '../../services/stock-inventory.service';
import { forkJoin } from 'rxjs';
import {map} from 'rxjs/operators';
import {Item} from '../../models/item.interface';

@Component({
  selector: 'stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  products: Product[];
  productMap: Map<number, Product>;
  total: number;

  formGroup = this.fb.group({
    store: this.fb.group({
      branch: ['', [Validators.required]],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private stockService: StockInventoryService) {
  }

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    forkJoin(cart, products).pipe(
      map(([cart, products]) => {
        const myMap = products.map<[number, Product]>(product => [product.id, product]);
        this.products = products;
        cart.forEach(item => this.addStock(item));
        return myMap;
      })
    ).subscribe(data => {
      this.productMap = new Map<number, Product>(data);
      this.calculateTotal(this.formGroup.get('stock').value);
      this.formGroup.get('stock').valueChanges.subscribe(value => this.calculateTotal(value));
    });

  }

  calculateTotal(value: Item[]) {
    this.total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.productId).price);
    }, 0);
  }

  createStock(stock): FormGroup {
    return this.fb.group({
      productId: parseInt(stock.productId, 10) || '',
      quantity: stock.quantity || 50
    });
  }

  addStock(stock) {
    const control = this.formGroup.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({group, index}) {
    const control = this.formGroup.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.formGroup.value);
  }
}
