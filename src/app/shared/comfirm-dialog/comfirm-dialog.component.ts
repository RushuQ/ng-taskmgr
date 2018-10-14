import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-comfirm-dialog",
  template: `
  <h3 mat-dialog-title>{{title}}</h3>
  <div mat-dialog-content>
    {{content}}
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" type="button" (click)="onClick(true)">确定</button>
    <button mat-dialog-close mat-button color="primary" type="button" (click)="onClick(false)">取消</button>
  </div>
  `,
  styles: []
})
export class ComfirmDialogComponent implements OnInit {
  title = '';
  content = '';
  constructor(
    private dialogRef: MatDialogRef<ComfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }
  onClick(result: boolean) {
    this.dialogRef.close(result);
  }
}
