// 自定义表单控件
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: "app-image-list-select",
  templateUrl: "./image-list-select.component.html",
  styleUrls: ["./image-list-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent), //注册自己
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent), //注册自己
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input()
  cols: number = 6;
  @Input()
  rowHeight = "64px";
  @Input()
  title = "选择";
  @Input()
  items: string[] = []; //图片地址
  @Input()
  useSvgIcon = false;
  @Input()
  itemWidth = "80px";
  
  selected: string;

  constructor() {}
  private propagateChange = (_: any) => {};
  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }
  writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.selected = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  
  validate(v:FormControl): {[key:string]:any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    }
  }
}
