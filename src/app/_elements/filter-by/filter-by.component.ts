import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss'],
})
export class FilterByComponent implements OnInit {
  @Input() placeholder = "";
  @Input() filter: string;
  @Input() options: string[];
  isShowSelect = false;

  @Output() onFilterByChanged = new EventEmitter<string>();

  constructor() { }
  ngOnInit() {
  }

  onChange() {
    this.onFilterByChanged.emit(this.filter);
  }
  toggleShowSelect() {
    this.isShowSelect = this.isShowSelect ? false : true;
  }
  select(option) {
    this.filter = option;
    this.onChange();
    this.isShowSelect = false;
  }
}