import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

interface Todo {
  task: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  // Configure firestore to save todos to database on Firestore
  firestoreCollection: AngularFirestoreCollection<Todo>;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection<Todo>('todos');
  }

  addTask(task: string) {
    this.firestoreCollection.add({
      task,
      isCompleted: false,
    });
  }

  updateTask(taskId: string, newStatus: boolean) {
    this.firestoreCollection.doc(taskId).update({ isCompleted: newStatus });
  }

  changeTask(taskId: string, updatedTask: string) {
    this.firestoreCollection.doc(taskId).update({ task: updatedTask });
  }

  deleteTask(taskId: string) {
    this.firestoreCollection.doc(taskId).delete();
  }
}
