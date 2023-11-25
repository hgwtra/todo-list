import { Component } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  taskList : any[] = [];

  constructor(private todoService: TodoListService) {}

  ngOnInit():void {
    //Observable for task lists
    this.todoService.firestoreCollection.valueChanges({idField: 'id'}).subscribe(item => {

      this.taskList=item;
    })
    }
  

  addToDoTask(taskInput: HTMLInputElement) {
    //Add task to database
    if (taskInput.value) {
      this.todoService.addTask(taskInput.value);

      //Empty to-do input
      taskInput.value = '';
    }
  }

  changeTaskStatus(id: string, newStatus: boolean) {
    this.todoService.updateTask(id, newStatus);
  }

  removeToDoTask(id:string) {

  }

}
