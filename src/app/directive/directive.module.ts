import { NgModule } from "@angular/core";
import { DropDirective } from "./drop.directive";
import { DragDirective } from "./drag.directive";

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective]
})
export class DirectiveModule { }
