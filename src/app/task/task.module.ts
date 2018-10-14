import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { TaskHomeComponent } from "./task-home/task-home.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskItemComponent } from "./task-item/task-item.component";
import { TaskRoutingModule } from "./task-routing.module";
import { TaskHeaderComponent } from "./task-header/task-header.component";
import { QuickTaskComponent } from "./quick-task/quick-task.component";
import { CopyTaskComponent } from "./copy-task/copy-task.component";
import { NewProjectComponent } from "../project/new-project/new-project.component";
import { NewTaskComponent } from "./new-task/new-task.component";

@NgModule({
  imports: [SharedModule, TaskRoutingModule],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHeaderComponent,
    QuickTaskComponent,
    CopyTaskComponent,
    NewTaskComponent,
    NewTaskListComponent
  ],
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent
  ]
})
export class TaskModule {}
