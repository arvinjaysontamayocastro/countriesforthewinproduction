import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { CountryListComponent } from "./country/list/country-list.component";
import { CountryViewComponent } from "./country/view/country-view.component";

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'country/:id', component: CountryViewComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
