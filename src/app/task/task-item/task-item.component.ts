import { itemAnim } from './../../animations/item.anim';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input()
  item;
  @Input()
  avatar;

  @Output()
  taskClick = new EventEmitter<void>();

  widerPriority = "in";
  constructor() {}

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : "unassigned";
  }

  @HostListener("mouseenter")
  onmouseenter() {
    this.widerPriority = "out";
  }
  @HostListener("mouseleave")
  onmouseLeave() {
    this.widerPriority = "in";
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }
}
