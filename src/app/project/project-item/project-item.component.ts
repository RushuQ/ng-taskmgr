import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from "@angular/core";
import { cardAnim } from "../../animations/card.anim";

@Component({
  selector: "app-project-item",
  templateUrl: "./project-item.component.html",
  styleUrls: ["./project-item.component.scss"],
  animations: [cardAnim]
})
export class ProjectItemComponent implements OnInit {
  @Input()
  item: string;
  @Output()
  OnEdit = new EventEmitter<void>();
  @Output()
  OnInvite = new EventEmitter<void>();
  @Output()
  onDel = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter',['$event.target'])
  onmouseenter(target) {
    this.cardState = 'hover'
  }
  @HostListener('mouseleave',['$event.target'])
  onmouseleave(target) {
    this.cardState = 'out';
  }

  constructor() {}

  ngOnInit() {
    //console.log(this.item);
  }
  OnEditClick() {
    this.OnEdit.emit();
  }
  OnInviteClick() {
    this.OnInvite.emit();
  }
  onDelClick() {
    this.onDel.emit();
  }
}
