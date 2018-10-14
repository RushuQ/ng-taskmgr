import { Injectable } from '@angular/core';

export interface DragDate {
  tag: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }
}
