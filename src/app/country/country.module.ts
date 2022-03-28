import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CountryService } from "../_services/country.service";
import { CountryListComponent } from './list/country-list.component';
import { CountryViewComponent } from './view/country-view.component';

@NgModule({
  declarations: [
    CountryListComponent,
    CountryViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers:  [
    CountryService
  ]
})
export class CountryModule {}
