import { UserService } from "./../../services/user.service";
import { Observable } from "rxjs/Observable";
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { User } from "src/app/domain";

@Component({
  selector: "app-chips-list",
  templateUrl: "./chips-list.component.html",
  styleUrls: ["./chips-list.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent), //注册自己
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent), //注册自己
      multi: true
    }
  ]
})
export class ChipsListComponent implements ControlValueAccessor, OnInit {
  @Input()
  multiple = true;
  @Input()
  label = "添加/修改成员";
  @Input()
  placeholderText = "请输入成员 email";

  chips: FormGroup;
  items: User[];
  memberResults$: Observable<User[]>;

  constructor(
    private fb: FormBuilder, 
    private service: UserService
  ) {
    this.items = []
  }

  ngOnInit() {
    this.chips = this.fb.group({
      memberSearch: [""]
    });
    this.memberResults$ = this.chips
      .get("memberSearch")
      .valueChanges.debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  private propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduve((e, c) => ({ ...e, c }), {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(v: FormControl): { [key: string]: any } {
    return this.items
      ? null
      : {
          chipListInvalid: {
            valid: false
          }
        };
  }

  handleMemberSelection(member: User) {
    console.log(this.items)
    // if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
    //   return false;
    // }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.chips.patchValue({ memberSearch: member.name });
    this.propagateChange(this.items);
  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.chips.patchValue({ memberSearch: "" });
    this.propagateChange(this.items);
  }
  displayUser(user: User): string {
    return user ? user.name : "";
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }
}
