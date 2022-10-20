import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../shared/interfaces/task';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  public tasksForm: FormGroup;
  private subscription: Subscription = new Subscription();

  get title(): FormControl {
    return this.tasksForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.tasksForm.get('description') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private tasksServices: TasksService,
    private toastrService: ToastrService
  ) {
    this.tasksForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.tasksServices.tasks$.subscribe(
        (tasks: Task[]) => (this.tasks = tasks)
      )
    );
  }

  public submit(): void {
    this.tasksServices.addTask(this.tasksForm.value);
    this.tasksForm.reset();
    this.toastrService.success('Task', 'Task Added successfully!!!', {
      closeButton: true,
    });
  }

  public deleteTask(task: Task): void {
    if (confirm('Are you sure to delete ' + task.title)) {
      this.tasksServices.deleteTask(task);
      this.toastrService.success('Task', 'Task deleted successfully!!!', {
        closeButton: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
