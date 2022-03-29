import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/_models/country.model';
import { CountryService } from 'src/app/_services/country.service';
import { HelperService } from 'src/app/_services/helper.service';


@Component({
  selector: 'app-country-art',
  templateUrl: './country-art.component.html',
  styleUrls: ['./country-art.component.scss'],
})
export class CountryArtComponent implements OnInit {
  public countries: Country[];
  public countriesSub: Subscription;
  public hoveredCountry: string;
  constructor(public countryService: CountryService, private helperService: HelperService) {}
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
