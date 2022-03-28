import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../_services/country.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  constructor(public countryService: CountryService
  ) {}

  ngOnInit() {
  }
}
