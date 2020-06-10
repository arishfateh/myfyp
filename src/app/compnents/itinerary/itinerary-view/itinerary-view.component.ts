import { Component, OnInit } from "@angular/core";
import { Itinerary } from "src/app/model/itinerary.model";
import { ItineraryService } from "src/app/services/itinerary.service";
import { from } from "rxjs";
import { ItineraryDays } from "src/app/model/itinerary-days.model";
import { AttractionPoint } from "src/app/model/attraction-point.model";
import { MatSnackBar } from "@angular/material";

class both {
  iti: Itinerary;
  days: ItineraryDays[];
}

@Component({
  selector: "app-itinerary-view",
  templateUrl: "./itinerary-view.component.html",
  styleUrls: ["./itinerary-view.component.css"],
})
export class ItineraryViewComponent implements OnInit {
  itinerary: Itinerary[];
  itinerarydays: ItineraryDays[] = [];
  itinerarydays2: AttractionPoint[] = [];

  public itineraryList: Array<Itinerary>;
  all: both[] = [];

  public check: number = 0;
  public len: number;
  constructor(
    public itineraryService: ItineraryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }
  public newarray: ItineraryDays[] = [];
  thisfunc(item) {
    this.newarray.push(item);
    console.log("a");
  }
  public last: string = null;
  ngAfterViewChecked() {
    if (this.itinerary.length > 0 && this.check == 0) {
      this.len = this.itinerary.length;
      this.check = 1;
      this.last = "s";
    }
  }

  getData() {
    this.itineraryService.getAllItinerary().subscribe((data) => {
      this.itinerary = data;
    });
    this.itinerary.forEach((value) => {
      console.log(value, "daasd");
    });
  }
  onDelete(id: string) {}
}
