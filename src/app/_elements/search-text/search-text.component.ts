import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
})
export class SearchTextComponent implements OnInit {
  @Input() placeholder = "";



  @Input() searchText: string;
  @Output() onSearchTextChanged = new EventEmitter<string>();

  constructor() { }
  ngOnInit() {
  }

  onChange() {
    this.onSearchTextChanged.emit(this.searchText);
  }

  clearSearchText() {
    this.searchText = '';
    this.onChange();
  }
}