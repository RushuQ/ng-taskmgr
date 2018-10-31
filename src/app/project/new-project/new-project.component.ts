import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title = '';
  form: FormGroup;
  coverImages = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name,Validators.required],
        desc: [this.data.project.desc],
        coverImg:[this.data.project.coverImg]
      });
      this.title = '修改项目';
    }else{
      this.form = this.fb.group({
        name: ['',Validators.required],
        desc: [],
        coverImg:[]
      });
      this.title = '创建项目'
    }
  }

  onSubmit({ value, valid }, ev: Event) {
    if(!valid)return;
    ev.preventDefault();
    this.dialogRef.close(value)
  }
}
