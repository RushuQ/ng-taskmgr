import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { ProjectModule } from "./project/project.module";
import { HttpClientModule } from "@angular/common/http";
import { LoginModule } from "./login/login.module";
import { TaskModule } from "./task/task.module";
import { DropDirective } from './directive/drop.directive';
import { DragDirective } from './directive/drag.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    ProjectModule,
    LoginModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
