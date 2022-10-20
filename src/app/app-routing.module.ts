import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskContainerComponent } from './task-container/task-container.component';

const routes: Routes = [
  {
    path: '',
    component: TaskContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
