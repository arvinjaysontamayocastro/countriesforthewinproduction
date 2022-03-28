import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from '../_models/country.model';
import { CountryService } from '../_services/country.service';
import { HelperService } from '../_services/helper.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  public countries: Country[];
  private countriesSub: Subscription;
  public hoveredCountry: string;
  constructor(public countryService: CountryService, private helperService: HelperService
  ) {}

  ngOnInit() {
    this.countries = this.helperService.sortBy(this.countryService.getCountries(), 'name');
    this.countriesSub = this.countryService
      .getCountryUpdateListener()
      .subscribe((countryData: { countries: Country[]; regions: string[] }) => {
        this.countries = this.helperService.sortBy(countryData.countries, 'name');
      });
  }

  mouseEnter(country) {
    this.hoveredCountry = country.name;
  }
  mouseLeave(country) {
    this.hoveredCountry = "";
  }
}
