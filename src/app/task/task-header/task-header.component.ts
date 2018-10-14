import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-task-header",
  templateUrl: "./task-header.component.html",
  styleUrls: ["./task-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  @Input()
  header: string;
  @Output()
  newTask = new EventEmitter<void>();
  @Output()
  onEditList = new EventEmitter<void>();
  @Output()
  moveAll = new EventEmitter<void>();
  @Output()
  delList = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onEditListClick() {
    this.onEditList.emit();
  }
  onMoveAllClick() {
    this.moveAll.emit();
  }
  onDelListClick() {
    this.delList.emit();
  }
  onNewTaskClick() {
    this.newTask.emit();
  }
}
