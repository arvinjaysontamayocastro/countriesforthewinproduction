import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/_models/country.model';
import { CountryService } from 'src/app/_services/country.service';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.scss'],
})
export class CountryViewComponent {
  country: Country;
  constructor(private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) {}

  private countriesSub: Subscription;
  
  ngOnInit() {
    this.getCountry();
    this.countriesSub = this.countryService
      .getCountryUpdateListener()
      .subscribe((countryData: { countries: Country[]; regions: string[] }) => {
        this.getCountry();
      });
  }

  getCountry() {
    var id = this.activatedRoute.snapshot.params.id;
    this.country = this.countryService.getCountry(id);
    console.log(this.country);
    
  }

  back() {
    this.location.back()
  }
}
