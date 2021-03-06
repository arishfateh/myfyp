import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { RouteAddComponent } from "./compnents/route/route-add/route-add.component";
import { RouteViewComponent } from "./compnents/route/route-view/route-view.component";
import { RouteEditComponent } from "./compnents/route/route-edit/route-edit.component";
import { HttpClientModule } from "@angular/common/http";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "hammerjs";
import { AttractionAddComponent } from "./compnents/attractionpoints/attraction-add/attraction-add.component";
import { AttractionEditComponent } from "./compnents/attractionpoints/attraction-edit/attraction-edit.component";
import { AttractionViewComponent } from "./compnents/attractionpoints/attraction-view/attraction-view.component";
import { StayViewComponent } from "./compnents/staypoints/stay-view/stay-view.component";
import { StayEditComponent } from "./compnents/staypoints/stay-edit/stay-edit.component";
import { StayAddComponent } from "./compnents/staypoints/stay-add/stay-add.component";
import { HotelAddComponent } from "./compnents/hotel/hotel-add/hotel-add.component";
import { HotelEditComponent } from "./compnents/hotel/hotel-edit/hotel-edit.component";
import { HotelViewComponent } from "./compnents/hotel/hotel-view/hotel-view.component";
import { ItineraryAddComponent } from "./compnents/itinerary/itinerary-add/itinerary-add.component";
import { ItineraryViewComponent } from "./compnents/itinerary/itinerary-view/itinerary-view.component";
import { ItineraryEditComponent } from "./compnents/itinerary/itinerary-edit/itinerary-edit.component";
import { CityAddComponent } from "./compnents/city/city-add/city-add.component";
import { CityViewComponent } from "./compnents/city/city-view/city-view.component";
import { CityEditComponent } from "./compnents/city/city-edit/city-edit.component";
import { HomeComponent } from "./compnents/home/home.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AboutUsComponent } from "./compnents/about-us/about-us.component";
import {
  SearchComponent,
  DialogOverviewExampleDialog2,
} from "./compnents/search/search.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  Search2Component,
  DialogOverviewExampleDialog,
} from "./compnents/search2/search2.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { IgxCardModule } from "igniteui-angular";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";

@NgModule({
  declarations: [
    AppComponent,
    RouteAddComponent,
    RouteViewComponent,
    RouteEditComponent,
    AttractionAddComponent,
    AttractionEditComponent,
    AttractionViewComponent,
    StayViewComponent,
    StayEditComponent,
    StayAddComponent,
    HotelAddComponent,
    HotelEditComponent,
    HotelViewComponent,
    ItineraryAddComponent,
    ItineraryViewComponent,
    ItineraryEditComponent,
    CityAddComponent,
    CityViewComponent,
    CityEditComponent,
    HomeComponent,
    AboutUsComponent,
    SearchComponent,
    Search2Component,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "",
    }),
    BrowserModule,
    AgmDirectionModule,
    IgxCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatDialogModule,
    NgbModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,

    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],

  entryComponents: [DialogOverviewExampleDialog, DialogOverviewExampleDialog2],
})
export class AppModule {}
