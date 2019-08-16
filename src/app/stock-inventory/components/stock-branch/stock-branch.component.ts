import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'stock-branch',
  templateUrl: './stock-branch.component.html',
  styleUrls: ['./stock-branch.component.scss']
})
export class StockBranchComponent {

  @Input() parent: FormGroup;

  required(name: string) {
    return (
      this.parent.get(`store.${name}`).hasError('required') && this.parent.get(`store.${name}`).touched
    );
  }

}
