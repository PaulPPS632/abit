import { Component, Input } from '@angular/core';
import { Habito } from '../../models/habito';

@Component({
  selector: 'app-cart-habito',
  imports: [],
  templateUrl: './cart-habito.component.html',
  styleUrl: './cart-habito.component.css',
})
export class CartHabitoComponent {

  @Input() habit: Habito =
  {
    id:'',
    name: '',
    tag:'',
    description:'',
    status: ''
  };

}
