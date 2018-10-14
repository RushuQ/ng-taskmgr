import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleDarkTheme = new EventEmitter<void>();
  @Output()
  toggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.toggle.emit(); 
  }
  onChange(checked) {
    this.toggleDarkTheme.emit(checked);
  }
}
