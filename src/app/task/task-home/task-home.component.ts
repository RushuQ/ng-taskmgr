import { ComfirmDialogComponent } from './../../shared/comfirm-dialog/comfirm-dialog.component';
import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewProjectComponent } from './../../project/new-project/new-project.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { TaskListService } from "../../services/task-list.service";
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: "app-task-home",
  templateUrl: "./task-home.component.html",
  styleUrls: ["./task-home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: "代办",
      order: 1,
      tasks: [
        {
          id: 1,
          desc: "任务一：去星巴克麦咖啡",
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: "任务二：去肯德基买汉堡",
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: "进行中",
      order: 3,
      tasks: [
        {
          id: 1,
          desc: "任务一：去星巴克麦咖啡",
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: "任务二：去肯德基买汉堡",
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    },
    {
      id: 3,
      name: "进行中",
      order: 2,
      tasks: [
        {
          id: 1,
          desc: "任务一：去星巴克麦咖啡",
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: "张三",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date()
        }
      ]
    }
  ];
  constructor(
    private diolog: MatDialog,
    private service$: TaskListService
    ) {}

  ngOnInit() {}

  launchNewListDialog() {
    this.diolog.open(NewProjectComponent, {
      data: { title: "新建列表" }
    }).afterClosed().subscribe(result => {});
  }

  launchUpdateTaskDialog(task) {
    this.diolog.open(NewTaskComponent, {
      data: { task, title: "修改任务" }
    })
  }
  launchNewTaskDialog() {
    this.diolog.open(NewTaskComponent,{
      data: { title: "新建任务任务" }
    })
  }

  launchCopyTaskDialog() {
    this.diolog.open(CopyTaskComponent, {
      data: { lists: this.lists }
    });
  }

  launchEditListDialog() {
    this.diolog.open(NewTaskListComponent, {
      data: { title: "更改列表名称" }
    }).afterClosed().subscribe(_=>{});
  }

  launchComfirmDialog() {
    this.diolog.open(ComfirmDialogComponent, {
      data: { title: "删除任务", content: "您确认删除该任务吗？" }
    }).afterClosed().subscribe(_=>{});
  }
}
