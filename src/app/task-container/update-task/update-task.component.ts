import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/shared/interfaces/task';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  @Input() public task?: Task;
  @Output() public onClose: EventEmitter<boolean> = new EventEmitter();
  public tasksForm: FormGroup = this.initForm();

  get title(): FormControl {
    return this.tasksForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.tasksForm.get('description') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastrService: ToastrService
  ) {}

  initForm(task: Task = { title: '', description: '' }): FormGroup {
    return this.fb.group({
      title: [task.title, Validators.required],
      description: [
        task.description,
        [Validators.required, Validators.minLength(20)],
      ],
    });
  }

  ngOnInit(): void {
    this.tasksForm = this.initForm(this.task);
  }

  public close(event: boolean): void {
    this.onClose.emit(event);
  }

  public submit(): void {
    this.tasksService.updateTask(this.tasksForm.value);
    this.toastrService.success('Task', 'Task Added successfully!!!', {
      closeButton: true,
    });
  }
}
