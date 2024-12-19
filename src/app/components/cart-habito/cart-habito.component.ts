import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() habitClicked = new EventEmitter<Habito>(); 
  onHabitClick() {
    this.habitClicked.emit(this.habit); // Emitir el habit al hacer clic
  }
}
