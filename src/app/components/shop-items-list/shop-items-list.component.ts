import {Component, Input} from '@angular/core';
import {ShopItemComponent} from '../shop-item/shop-item.component';
import {Item} from "../../models/item.model";

@Component({
  selector: 'app-shop-items-list',
  imports: [
    ShopItemComponent,
  ],
  templateUrl: './shop-items-list.component.html',
  styleUrl: './shop-items-list.component.scss'
})
export class ShopItemsListComponent {
  @Input() shopItems!: Array<Item>;
  @Input() title!: string;
}
