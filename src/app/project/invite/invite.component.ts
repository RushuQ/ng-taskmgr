import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import { User } from "src/app/domain";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-invite",
  templateUrl: "./invite.component.html",
  styleUrls: ["./invite.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InviteComponent>
  ) {}

  ngOnInit() {
    this.members = [...this.data.members];
  }

  onSubmit(ev: Event, { valid, value }) {
    ev.preventDefault();
    if(!valid)return;
    this.dialogRef.close(this.members);
  }
}
