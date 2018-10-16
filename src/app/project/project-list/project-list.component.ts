import { ComfirmDialogComponent } from "./../../shared/comfirm-dialog/comfirm-dialog.component";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding
} from "@angular/core";
import { ProjectService } from "../../services/project.service";
import { MatDialog } from "@angular/material";
import { listAnimation } from "../../animations/list.anims";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { slideToRight } from "./../../animations/router.anim";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [listAnimation, slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @HostBinding("@routerAnim")
  projects = [
    // {
    //   id: 1,
    //   name: "企业协作平台",
    //   desc: "这是一个企业内部项目",
    //   coverImg: "assets/img/covers/0.jpg"
    // },
    // {
    //   id: 2,
    //   name: "自动化测试项目",
    //   desc: "这是一个企业内部项目",
    //   coverImg: "assets/img/covers/1.jpg"
    // }
  ];
  constructor(
    private service$: ProjectService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service$.get("1").subscribe(projects => (this.projects = projects));
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
    this.cd.markForCheck();
  }
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { title: "新增项目" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projects = [
        ...this.projects,
        {
          id: 3,
          name: "一个新项目",
          desc: "这是一个新项目",
          coverImg: "assets/img/covers/2.jpg"
        }
      ];
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, { data: "data" });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  launchUpdateDialog() {
    this.dialog.open(NewProjectComponent, {
      data: { title: "编辑项目" }
    });
  }
}
