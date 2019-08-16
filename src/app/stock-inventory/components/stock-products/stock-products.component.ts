import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.scss']
})
export class StockProductsComponent implements OnInit {

  @Input() parent: FormGroup;
  @Input() map: Map<number, Product>;
  @Output() outRemove = new EventEmitter<any>();

  constructor() {
  }

  getProduct(id) {
    return this.map.get(id);
  }

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  ngOnInit() {
  }

  onRemove(group , index) {
    this.outRemove.emit({group, index});
  }
}
