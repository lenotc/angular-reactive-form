import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent implements OnInit {

  @Input() parent: FormGroup;
  @Input() products: Product[];
  @Output() outAdd = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    this.outAdd.emit(this.parent.get('selector').value);
    this.parent.get('selector').reset({productId: '', quantity: 10});
  }
}
