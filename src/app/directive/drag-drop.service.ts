import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface DragDate {
  tag: string;
  data: any;
}

@Injectable({
  providedIn: "root"
})
export class DragDropService {
  /**
   * BehaviorSubject总能记住上一次的最新值
   */
  private _dragData = new BehaviorSubject<DragDate>(null);

  constructor() {}

  setDragData(data: DragDate) {
    this._dragData.next(data);
  }

  getDragData(data: DragDate) {
    return this._dragData.asObservable();
  }

  clearDragData(){
    this._dragData.next(null);
  }
}
