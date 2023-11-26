import { Component } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  taskList: any[] = [];

  constructor(private todoService: TodoListService) {}

  ngOnInit(): void {
    //Observable for task lists
    this.todoService.firestoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((item) => {
        this.taskList = item.sort((a: any, b: any) => {
          return a.isCompleted - b.isCompleted;
        }); //comparision in a sort method to push the completed task to the bottom of the list
      });
  }

  //Add a task to the list
  addToDoTask(taskInput: HTMLInputElement) {
    //Add task to database
    if (taskInput.value) {
      this.todoService.addTask(taskInput.value);

      //Empty to-do input
      taskInput.value = '';
    }
  }

  //Change a task status: Done? Not Done?
  changeTaskStatus(id: string, newStatus: boolean) {
    this.todoService.updateTask(id, newStatus);
  }

  //Remove a task from the list
  removeToDoTask(id: string) {
    this.todoService.deleteTask(id);
  }

  editTask(id: string) {}
}
