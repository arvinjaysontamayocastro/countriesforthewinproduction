import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Country } from '../_models/country.model';
import { HelperService } from './helper.service';

const BACKEND_URL = environment.apiUrl + '/all';

@Injectable({ providedIn: 'root' })
export class CountryService {

  constructor(private http: HttpClient, private router: Router, private helperService: HelperService) {
    this.triggerLoadCountries();
  }

  private countries: Country[] = [];
  private regions: string[];
  private countriesUpdated = new Subject<{countries: Country[], regions: string[]}>();
  private isUseCache: boolean = environment.isUseCache;
  // jobsPerPage: number, currentPage: number
  getCountries() {
    return this.countries;
  }
  getRegions() {
    return this.regions;
  }
  getCountry(id: string) {
    id = id.replace(/%20/g, " ");
    console.log(id);
    console.log(this.countries);
    if(this.countries && this.countries.length > 0) {
      var country = this.countries.filter(c=>c.name === id)[0];
      console.log(country);
      if(country) {
        this.processNativeName(country);
        this.processCurrencies(country);
        this.processLanguages(country);
        this.processBorders(country);
        return country;
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }
  processNativeName(country) {
    var nativeNameProcessed = [];

    var nativeNameList = Object.keys(country.nativeName);
    country.nativeNameProcessed = country.nativeName[nativeNameList[nativeNameList.length-1]].common;
  }

  processCurrencies(country) {
    if(!country.currencies || country.currencies.length === 0) {
      country.currenciesProcessed = ""; 
      return;
    }
    var currenciesProcessed = [];

    var currenciesList = Object.keys(country.currencies);
    currenciesList.forEach(currenciesKey => {
      currenciesProcessed.push(country.currencies[currenciesKey].name + " ("+ country.currencies[currenciesKey].symbol+")");
    });
    country.currenciesProcessed = currenciesProcessed.join(", ");
  }

  processLanguages(country) {
    if(!country.languages || country.languages.length === 0) {
      country.languagesProcessed = ""; 
      return;
    }
    var languagesProcessed = [];

    var languagesList = Object.keys(country.languages);
    languagesList.forEach(languagesKey => {
      languagesProcessed.push(country.languages[languagesKey]);
    });
    
    languagesProcessed = languagesProcessed.sort((a, b) => a.localeCompare(b));
    country.languagesProcessed = languagesProcessed.join(", ");
  }

  processBorders(country) {
    if(!country.borders || country.borders.length === 0) {
      country.bordersProcessed = []; 
      return;
    }
    var bordersProcessed = [];

    var bordersList = Object.keys(country.borders);
    bordersList.forEach(bordersKey => {
      // Get Country Name
      var countryName = this.countries.filter(c=>c.cca3 === country.borders[bordersKey])[0].name;
      bordersProcessed.push(countryName);
    });
    country.bordersProcessed = bordersProcessed;
  }

  processRegions() {
    var regions = this.countries.map(c => c.region);
    this.regions = this.helperService.sortUnique(regions);
    console.log(this.regions);
  }

  private triggerLoadCountries() {
    var countriesFromCache = sessionStorage.getItem("countries");
    if (countriesFromCache) {
      console.log("triggerLoadCountries: Loaded from cache");
      this.countries = JSON.parse(countriesFromCache);
      this.processRegions();
    }
    else {
      console.log("triggerLoadCountries: Loading from http");
      this.loadCountries();
    }
  }

  private loadCountries() {
    this.http
      .get<{ countries: any }>(BACKEND_URL)
      .pipe(
        map((countryData) => {
          var countries = JSON.parse(JSON.stringify(countryData));
          return {countries: countries.map(country => {
            return {
              name: country.name.common,
              nativeName: country.name.nativeName,
              population: country.population,
              region: country.region,
              subRegion: country.subregion,
              capital: country.capital, // array
              topLevelDomain: country.tld,
              currencies: country.currencies,
              languages: country.languages,
              borders: country.borders,
              fifa: country.fifa,
              flags: country.flags,
              cca1: country.cca1,
              cca2: country.cca2,
              cca3: country.cca3
            };
          })};
        })
      )
      .subscribe((transformedPostData) => {
        this.countries = transformedPostData.countries;
        sessionStorage.setItem("countries", JSON.stringify(this.countries));
        this.processRegions();
        this.countriesUpdated.next({ countries: [...this.countries], regions: [...this.regions]});
      });
  }
  getCountryUpdateListener() {
    return this.countriesUpdated.asObservable();
  }
}
