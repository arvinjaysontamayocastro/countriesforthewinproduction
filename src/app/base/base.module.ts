import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CountryArtComponent } from "../_elements/country-art/country-art.component";
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [
    BaseComponent,
    CountryArtComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class BaseModule {}
