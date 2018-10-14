import { DragDropService } from './drag-drop.service';
import { Directive, Renderer2, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: "[app-draggable][draggedClass]"
})
export class DragDirective {
  private _isDraggable = false;

  @Input()
  dragTag: string;

  @Input("app-draggable")
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, "draggable", `${val}`);
  }
  get isDraggable() {
    return this._isDraggable;
  }

  @Input()
  draggedClass: string;

  constructor(
    private rd: Renderer2,
    private el: ElementRef,
    private service: DragDropService
  ) {}

  @HostListener("dragstart", ["$event"])
  ondragstart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      // 开始拖拽时要传递数据
    }
  }

  @HostListener("dragend", ["$event"])
  ondragend(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
