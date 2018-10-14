import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskHomeComponent } from './task-home/task-home.component';

const routes: Routes = [
    {
        path: 'task', component: TaskHomeComponent
    }
];
@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule],
    providers: [],
})
export class TaskRoutingModule {}