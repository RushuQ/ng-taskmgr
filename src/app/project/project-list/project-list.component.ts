import { Subscription } from 'rxjs';
import { ComfirmDialogComponent } from "./../../shared/comfirm-dialog/comfirm-dialog.component";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  OnDestroy
} from "@angular/core";
import { ProjectService } from "../../services/project.service";
import { MatDialog } from "@angular/material";
import { listAnimation } from "../../animations/list.anims";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { slideToRight } from "./../../animations/router.anim";
import * as _ from "lodash";
import { map } from "rxjs-compat/operator/map";
import { Project } from "src/app/domain";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [listAnimation, slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit,OnDestroy {
  @HostBinding("@routerAnim")
  state;
  sub: Subscription;
  projects;
  constructor(
    private service$: ProjectService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.service$.get('').subscribe(projects => {
      this.projects = projects;
      console.log(projects);
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    if(this.sub)
      this.sub.unsubscribe();
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .switchMap(_=>this.service$.del(project))
      .subscribe(_ => {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.cd.markForCheck();
      });
  }

  openNewProjectDialog() {
    console.log(this.getThumbnails());
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), img: selectedImg }
    });
    // 注意：一般不做subscribe里面的subscribe操作，会使用高级操作进行执行，如switchMap
    dialogRef
      .afterClosed()
      .filter(n => n)
      .subscribe(project => {
        this.service$.add(project); // 流需要subscribe
        this.cd.markForCheck();
      });

    dialogRef
      .afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, { data: {members: []} });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), project: project }
    });
    console.log(project);
    dialogRef
      .afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, id: project.id ,coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        const index = this.projects.map(p=>p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0,index), project, ...this.projects.slice(index+1)];
        this.cd.markForCheck();
      });
  }

  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf("_") > -1 ? img.split("_")[0] + ".jpg" : img;
  }
}
