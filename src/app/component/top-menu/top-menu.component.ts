import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { CategoryComponent } from '../category/category.component';
import { JewelleryComponent } from '../jewellery/jewellery.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  items!: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Category', routerLink: 'category'
      },
      {
          label: 'Product', routerLink: 'product'
      },
      {
          label: 'Payment', routerLink: 'payment'
      }
  ]
  }

}
