import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/_models/country.model';
import { CountryService } from 'src/app/_services/country.service';
import { HelperService } from 'src/app/_services/helper.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  regions: string[];
  filteredCountries: Country[];

  public countriesSub: Subscription;

  filters = {
    searchText: "",
    searchRegion: ""
  };
  constructor(public countryService: CountryService, private helperService: HelperService) { }

  onSearchTextChanged(value: string) {
    this.filters.searchText = value;
    this.filterCountries();
  }

  onFilterByChanged(value: string) {
    this.filters.searchRegion = value;
    this.filterCountries();
  }

  ngOnInit() {
    var searchTextFromCache = sessionStorage.getItem("searchText");
    var searchRegionFromCache = sessionStorage.getItem("searchRegion");

    if(searchTextFromCache) {
      this.filters.searchText = searchTextFromCache;
    }
    if(searchRegionFromCache) {
      this.filters.searchRegion = searchRegionFromCache;
    }

    this.countries = this.countryService.getCountries();
    this.regions = this.countryService.getRegions();
    this.filterCountries();
    console.log("this.countries");
    console.log(this.countries);

    this.countriesSub = this.countryService
      .getCountryUpdateListener()
      .subscribe((countryData: { countries: Country[]; regions: string[] }) => {
        this.countries = countryData.countries;
        this.regions = countryData.regions;
        console.log("this.countries");
        console.log(this.countries);
        console.log("this.regions");
        console.log(this.regions);
        this.filterCountries();
      });
  }
  filterCountries() {
    var searchText = this.filters.searchText.toLowerCase();
    var searchRegion = this.filters.searchRegion ? this.filters.searchRegion.toLowerCase() : "";
    
    sessionStorage.setItem("searchRegion", this.filters.searchRegion);
    sessionStorage.setItem("searchText", this.filters.searchText);


    var filteredCountries = [...this.countries].filter(country => {
      return (country.name.toLowerCase().indexOf(searchText) != -1
      || (country.region && country.region.toLowerCase().indexOf(searchText)) != -1
      || (country.subRegion && country.subRegion.toLowerCase().indexOf(searchText) != -1)
      || (country.capital && country.capital.toString().toLowerCase().indexOf(searchText) != -1)) && (
        searchRegion.length === 0 || (country.region && country.region.toLowerCase() === searchRegion)
      );
    });

    filteredCountries = this.helperService.sortBy(filteredCountries, 'name');

    this.filteredCountries = filteredCountries;
  }
  selectRegion(region) {
    this.filters.searchRegion = region;
    this.filterCountries();
    // this.isShowSelectRegion = false;
  }
}
