import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2
} from "@angular/core";
import { DragDropService } from './drag-drop.service';

@Directive({
  selector: "[app-droppable]"
})
export class DropDirective {
  @Input()
  dragEnterClass: string;
  @Input()
  dragTags: string[] = [];

  private data$;

  constructor(
    private service: DragDropService,
    private el: ElementRef, 
    private rd: Renderer2) {}

  @HostListener("drop", ["$event"])
  ondrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener("dragenter", ["$event"])
  ondragenter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener("dragover", ["$event"])
  ondragover(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  @HostListener("dragleave", ["$event"])
  ondragleave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
}
