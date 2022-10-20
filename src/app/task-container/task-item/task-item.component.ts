import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task?: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @ViewChild('editTask') public el!: ElementRef<HTMLDivElement>;
  public faEdit = faEdit;
  public faTrash = faTrash;

  constructor() {}

  ngOnInit(): void {}

  public deleteTask(task: Task): void {
    this.onDeleteTask.emit(task);
  }

  public updateTask(task: Task): void {
    this.el.nativeElement.style.display = 'block';
  }

  public canceled(event: boolean): void {
    this.el.nativeElement.style.display = 'none';
  }
}
