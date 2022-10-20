import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([
    {
      title: 'Formation Angular',
      description: "Aujourd'hui je dois continuer la formation Angular",
    },
  ]);

  constructor() {}

  public addTask(task: Task): void {
    this.tasks$.next([...this.tasks$.value, task]);
  }

  public deleteTask(task: Task): void {
    let tasks = this.tasks$.value.filter((x: Task) => x.title !== task.title);
    this.tasks$.next(tasks);
  }

  public updateTask(input: Task): void {
    const value = this.tasks$.value;
    this.tasks$.next(
      value.map((task: Task) => {
        if (input.title === task.title) {
          return input;
        } else {
          return task;
        }
      })
    );
  }
}
