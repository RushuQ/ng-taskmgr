import { EventEmitter } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, Output } from '@angular/core';

@Component({
  selector: "app-quick-task",
  templateUrl: "./quick-task.component.html",
  styleUrls: ["./quick-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickTaskComponent implements OnInit {
  desc: string;
  @Output()
  quickTask = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  @HostListener("keyup.enter")
  sendQuickTask() {
    if (!this.desc || !this.desc.length || !this.desc.trim()) return;
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
