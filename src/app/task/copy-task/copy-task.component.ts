import {} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";

@Component({
  selector: "app-copy-task",
  templateUrl: "./copy-task.component.html",
  styleUrls: ["./copy-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {
  lists: any[];
  title = "移动所有任务";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<CopyTaskComponent>
  ) {}

  ngOnInit() {
    this.lists = this.data.lists;
  }

  onClick() {}
}
