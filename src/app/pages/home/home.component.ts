import { Component, OnInit } from '@angular/core';
import { Habito } from '../../models/habito';
import { FormsModule } from '@angular/forms';
import { CartHabitoComponent } from "../../components/cart-habito/cart-habito.component";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HabitoService } from '../../services/habito.service';
@Component({
  selector: 'app-home',
  imports: [FormsModule, CartHabitoComponent, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isModal: Boolean = false;
  habitsInit: Habito[]=[];
  habitsStage: Habito[]=[];
  habitsFinish: Habito[]=[];
  newHabit: Habito = {
    id:'',
    name: '',
    tag:'Job',
    description:'',
    status: 'initiated'
  };
  constructor(private habitoService: HabitoService){}
  ngOnInit(): void {
    this.habitoService.getHabits().subscribe((habits) => {
      this.habitsInit = habits.filter((habit: Habito) => habit.status === 'initiated')
      this.habitsStage= habits.filter((habit: Habito) => habit.status === 'stage')
      this.habitsFinish= habits.filter((habit: Habito) => habit.status === 'finished')
    });
  }
  CreateHabit(){
    console.log(this.newHabit);
    this.habitoService.addHabit(this.newHabit);
    this.newHabit = {
      id:'',
      name: '',
      tag:'',
      description:'',
      status: 'initiated'
    };
    this.toggleModal();
  }
  drop(event: CdkDragDrop<Habito[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedHabit = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'stageList') {
        movedHabit.status = 'stage';
      } else if (event.container.id === 'finishList') {
        movedHabit.status = 'finished';
      } else if (event.container.id === 'initList') {
        movedHabit.status = 'initiated';
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.habitoService.updateHabit(movedHabit);
    }
  }
  Create(){
    this.toggleModal();
  }
  toggleModal(){
    this.isModal = !this.isModal;
  }
}
