import { Component, OnInit } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CityService } from "src/app/services/city.service";
import { ForallService } from "src/app/services/forall.service";
import { AttractionPointService } from "src/app/services/attraction-point.service";
import { ItineraryService } from "src/app/services/itinerary.service";
import { HotelService } from "src/app/services/hotel.service";

import { Days } from "src/app/model/days";

import { City } from "src/app/model/city.model";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Route } from "src/app/model/route.model";
import { AttractionPoint } from "src/app/model/attraction-point.model";
import { __values } from "tslib";
import { Routes, RouterLink } from "@angular/router";
import { ThrowStmt, IfStmt } from "@angular/compiler";
import { Itinerary } from "src/app/model/itinerary.model";
import { Rooms } from "src/app/model/rooms.model";
import { Router, NavigationEnd } from "@angular/router";
import { ItineraryDays } from "src/app/model/itinerary-days.model";
import { parse } from "querystring";
import { JsonPipe } from "@angular/common";
import {
  MatDialog,
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Inject } from "@angular/core";

var Graph = require("graph-data-structure");

declare var jQuery: any;
export interface DialogData {
  hotels: Array<Rooms>;
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
})
export class DialogOverviewExampleDialog2 {
  public tempme: Array<any> = [];
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  public display = "dc";
  public display1 = null;
  public display2 = null;
  public display3 = null;
  public TripType = null;
  public last = null;
  public catagory51 = null;
  public catagory21 = null;
  public catagory31 = null;
  public catagory41 = null;

  public cityList: City[];
  public routeList: Route[];
  public attractionList: AttractionPoint[];

  public scorelist: Array<number> = [];

  public source: string = "Hunza";
  public destination: string;
  public no_of_days: string;
  public months: string;
  public stopovercity: Array<City> = [];

  public total_num_days: number;

  constructor(
    public dialog: MatDialog,
    config: NgbCarouselConfig,
    public router: Router,
    private fb: FormBuilder,
    public attractionService: AttractionPointService,
    public cityService: CityService,
    public itineraryService: ItineraryService,
    public forall: ForallService,
    public hotelService: HotelService
  ) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;

    config.pauseOnHover = false;
  }
  exampleForm: FormGroup;

  validation_messages = {
    Source: [{ type: "required", message: "Source is required." }],
    Destination: [{ type: "required", message: "Destination is required." }],
  };
  public check: number = 0;
  public len: number;
  public checking: number = 0;
  public disp: string = null;

  public finalalldays: number;
  public che: number = 0;

  ngAfterViewChecked() {
    if (this.hotelList && this.che == 0) {
      if (this.hotelList.length > 0) {
        console.log("hotel list", this.hotelList);
        if (this.itinerary.length >= this.inputdays) {
          console.log("in hotel set");
          this.SettingHotels();
          this.che = 1;
          console.log(this.itinerary, "after setting hotels");
        }
      }
    }

    if (this.cityList && this.check == 0) {
      this.len = this.cityList.length;
      this.check = 1;
    }
    if (this.cityList) {
      if (this.cityList.length > 0 && this.checking == 0) {
        this.disp = "csdc";
        this.checking = 1;

        this.createForm();
      }
    }
  }
  public argument: Array<Rooms> = [];

  openDialog(inp): void {
    this.argument = [];

    console.log(inp, "inpt");
    console.log(this.hotelList, "hotel list");
    console.log(
      this.hotelList.find((a) => a.City == inp),
      "filtered"
    );
    var a1 = this.hotelList.find((a) => a.City == inp);
    this.argument.push(a1);
    console.log(this.argument, "arg from dialog");

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      height: "800px",

      data: { hotel: this.argument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
    console.log("asas");

    console.log("fas");
    this.itineraryService.getAllItinerary().subscribe((data) => {
      this.itineraryList = data;
    });
    this.itineraryList.forEach((value) => {
      console.log(value, "daasd");
    });

    this.hotelService.getAllHotels().subscribe((data) => {
      this.hotelList = data;
    });
    this.hotelList.forEach((value) => {
      console.log(value, "daasd");
    });

    this.getcityData();
    this.getrouteData();
    this.getattractionData();

    this.display = null;
    this.display1 = null;
    this.display2 = null;
    this.display3 = null;
    this.last = "df";
  }

  public itineraryList: Array<Itinerary> = [];

  public hotelList: Array<Rooms> = [];

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  getHotelData() {
    console.log("hotel");
    this.hotelService.getAllHotels().subscribe((data) => {
      this.hotelList = data;
    });
  }
  getattractionData() {
    this.attractionService.getAllAttractionPoints().subscribe((data) => {
      this.attractionList = data;
    });
    this.attractionList.forEach((value) => {
      //console.log(value, 'daasd')
    });
  }

  getrouteData() {
    this.forall.getAllRoutes().subscribe((data) => {
      this.routeList = data;
    });
  }

  month(imi) {
    //console.log(imi);
    this.months = imi;
    this.search2();
  }
  days(imi) {
    //console.log(imi);
    this.no_of_days = imi;
    this.search3();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      Source: ["", Validators.required],
      Destination: ["", Validators.required],
    });
  }

  onSubmit(value) {}

  search() {
    this.display1 = "fd";
    this.display = null;
    this.source = this.exampleForm.value.Source;
    this.destination = this.exampleForm.value.Destination;
  }

  search2() {
    this.display1 = null;
    this.display2 = "cdw";
  }
  back12() {
    //console.log("sad");
    this.display = "vfv";
    this.display1 = null;
  }
  public inputdays: number = 0;
  search3() {
    this.display2 = null;
    this.TripType = "fs";

    console.log(this.no_of_days, this.months, this.source, this.destination);
    if (this.no_of_days == "3-5") {
      this.total_num_days = 5;
      this.finalalldays = 5;
      this.inputdays = 4;
    } else if (this.no_of_days == "6-8") {
      this.total_num_days = 8;
      this.finalalldays = 8;
      this.inputdays = 7;
    } else if (this.no_of_days == "9-11") {
      this.total_num_days = 10;
      this.finalalldays = 10;
      this.inputdays = 10;
    } else if (this.no_of_days == "12-15") {
      this.total_num_days = 13;
      this.finalalldays = 13;
      this.inputdays = 13;
    }
  }

  customize() {
    this.display3 = null;
    this.last = "dw";
  }
  dateselect() {
    //console.log("dscd");
  }
  start() {
    this.display3 = null;
    this.display = "dd";
  }

  back1() {
    this.display3 = "f";
    this.last = null;
  }

  daysclick(imi) {}

  getcityData() {
    this.cityService.getAllCity().subscribe((data) => {
      this.cityList = data;
    });
  }

  catagory1(imi) {
    this.TripType = null;
    this.catagory21 = "AA";

    this.scorelist.push(imi);
  }
  catagory2(imi) {
    this.catagory21 = null;
    this.catagory31 = "wd";
    this.scorelist.push(imi);
  }
  catagory3(imi) {
    this.catagory31 = null;
    this.catagory41 = "ds";
    this.scorelist.push(imi);
  }
  catagory4(imi) {
    this.catagory41 = null;
    this.catagory51 = "as";
    this.scorelist.push(imi);
  }

  catagory5(imi) {
    this.catagory51 = null;
    this.scorelist.push(imi);

    this.last = "ds";
    if (this.recommender == "recommender") {
      this.recommernderfunction();
    } else {
      this.completesearch();
    }

    console.log(this.scorelist);
  }

  public recommender: string = "recommender";

  public recommenderItineraryArray: Array<Itinerary> = [];

  public maximum: number = 0;
  public maxi: number = 0;
  public indexmax: number;
  recommernderfunction() {
    console.log("recommender");
    console.log(this.itineraryList);

    for (var i = 0; i < this.itineraryList.length; i++) {
      for (var j = 0; j < this.scorelist.length; j++) {
        if (this.itineraryList[i].scores.find((a) => a == this.scorelist[j])) {
          console.log("in if 1");
          if (
            this.recommenderItineraryArray.find(
              (a) => a._id == this.itineraryList[i]._id
            )
          ) {
            console.log("in if 2");
            console.log(this.itineraryList[i]._id);
            break;
          } else {
            console.log("in else 2");
            this.recommenderItineraryArray.push(this.itineraryList[i]);
            break;
          }
        }
      }
    }
    console.log(this.recommenderItineraryArray);
    // all itineraries fetched

    //now itineraries filtered on basis of days
    this.recommenderItineraryArray = this.recommenderItineraryArray.filter(
      (a) => a.Destination == this.destination
    );
    console.log(this.recommenderItineraryArray, "filtered destination");

    this.recommenderItineraryArray = this.recommenderItineraryArray.filter(
      (a) => a.NoOfDays == parseInt(this.no_of_days)
    );
    console.log(this.recommenderItineraryArray, "filtered no of days");

    if (this.recommenderItineraryArray.length == 0) {
      this.completesearch();
    } else {
      if (this.recommenderItineraryArray.length == 1) {
        this.itinerary = this.recommenderItineraryArray[0].todo;
        console.log(this.itinerary, "length=1");
      }
      ///chooses between the highest priority location
      else if (this.recommenderItineraryArray.length == 2) {
        console.log("in else of 2");
        for (var i = 0; i < this.recommenderItineraryArray[0].NoOfDays; i++) {
          console.log(this.recommenderItineraryArray[0].NoOfDays, " e ", i);
          var cit = this.cityList.find(
            (a) =>
              a.CityName == this.recommenderItineraryArray[0].todo[i].cityname
          );
          var cit2 = this.cityList.find(
            (a) =>
              a.CityName == this.recommenderItineraryArray[1].todo[i].cityname
          );
          if (cit.StayPriority > cit2.StayPriority) {
            this.itinerary[i] = this.recommenderItineraryArray[0].todo[i];
          }

          // chooses betweeen the max of stays of people
          else {
            this.itinerary[i] = this.recommenderItineraryArray[1].todo[i];
          }
        }
        console.log(this.itinerary, "length=2");
      } else {
        //if error remove = from for loop i
        for (var i = 0; i <= this.recommenderItineraryArray[0].NoOfDays; i++) {
          console.log(
            this.recommenderItineraryArray[0].NoOfDays,
            " no of days"
          );
          for (var j = 0; j < this.recommenderItineraryArray.length; j++) {
            this.maxi = 0;
            for (var k = 0; k < this.recommenderItineraryArray.length; k++) {
              if (
                this.recommenderItineraryArray[j].todo[i].cityname ==
                this.recommenderItineraryArray[k].todo[i].cityname
              ) {
                this.maxi = this.maxi + 1;

                console.log(
                  this.recommenderItineraryArray[j].todo[i].cityname,
                  " ",
                  this.recommenderItineraryArray[k].todo[i].cityname
                );
                console.log("maxi= ", this.maxi);
              }
            }
            if (this.maxi >= this.maximum) {
              console.log("in maxi");
              this.maximum = this.maxi;
              this.indexmax = j;
            }
          }
          console.log(this.indexmax, " indexmax");
          this.itinerary[i] = this.recommenderItineraryArray[
            this.indexmax
          ].todo[i];
          console.log(this.itinerary, "length=3");
        }
      }
    }
  }

  public checkier: number = 0;
  public putroute: Array<Route> = [];
  findroutes(source, destination) {
    console.log(source, destination, "find routes");
    this.putroute = [];
    if (this.routeArray.find((a) => a.StartPoint == source)) {
      var i = this.routeArray.findIndex((a) => a.StartPoint == source);
      while (this.routeArray[i].EndPoint != destination) {
        this.putroute.push(this.routeArray[i]);
        i = i + 1;
      }
      this.putroute.push(this.routeArray[i]);
      if (
        this.putroute[this.putroute.length - 1].EndPoint == this.destination
      ) {
        this.checkier = 1;
      }
      console.log(this.putroute, "ae");
      return this.putroute;
    }
  }

  findroutereturn(source, destination) {
    console.log(source, destination, "find routes return");
    this.putroute = [];
    if (this.routereturn.find((a) => a.StartPoint == source)) {
      var j = this.routereturn.findIndex((a) => a.StartPoint == source);

      while (this.routereturn[j].EndPoint != destination) {
        this.putroute.push(this.routereturn[j]);
        j = j + 1;
      }
      this.putroute.push(this.routereturn[j]);

      console.log(this.putroute, "be");
      return this.putroute;
    }
  }
  public newit: Days;
  public visited: Array<string> = [];
  public path1: Array<string> = [];
  public visi: Array<number> = [];
  completesearch() {
    this.localiti = [];
    localStorage.setItem("itinerary", JSON.stringify(this.localiti));

    var path = new Graph();

    for (var i = 0; i < this.routeList.length; i++) {
      if (this.routeList[i].isAvailable == true) {
        path.addEdge(this.routeList[i].StartPoint, this.routeList[i].EndPoint);
        path.addEdge(this.routeList[i].EndPoint, this.routeList[i].StartPoint);
      }
    }

    var a = path.shortestPath(this.source, this.destination);

    this.singlepathRoutes(a);
    this.Attractionpointlist(a);
    this.totaldist();
    this.citylist1(a);
    this.Totaltime();

    this.findStopOver();

    this.step3();

    this.attractionfind();
    this.MakingItinerary();

    if (this.itinerary) {
      var star = this.itinerary[this.itinerary.length - 1].fromcity;
      var end = this.itinerary[this.itinerary.length - 1].cityname;
      this.newit = new Days();
      this.newit.cityname = this.source;
      this.newit.fromcity = star;
      this.newit.Dayno = this.itinerary[this.itinerary.length - 1].Dayno + 1;
      this.itinerary.push(this.newit);
    }

    for (var i = 0; i < this.itinerary.length; i++) {
      if (this.itinerary[i].cityname != this.itinerary[i].fromcity) {
        this.itinerary[i].CurrentRoute = [];
        if (this.checkier == 0) {
          this.itinerary[i].CurrentRoute = this.findroutes(
            this.itinerary[i].fromcity,
            this.itinerary[i].cityname
          );
        } else {
          this.itinerary[i].CurrentRoute = this.findroutereturn(
            this.itinerary[i].fromcity,
            this.itinerary[i].cityname
          );
        }
      }
    }

    console.log(this.itinerary, "uff");
  }

  findRoute(start, end) {
    for (var i = 0; i < this.routeList.length; i++) {
      if (
        this.routeList[i].StartPoint == start &&
        this.routeList[i].EndPoint == end
      ) {
        return this.routeList[i];
      }
    }
  }

  findAttraction(city) {
    for (var i = 0; i < this.attractionList.length; i++) {
      if (this.attractionList[i].City == city) {
        this.attractionArray.push(this.attractionList[i]);
      }
    }
    return;
  }
  public attractionArray: Array<AttractionPoint> = [];
  public routeArray: Array<Route> = [];
  public cityArray: Array<City> = [];

  public routereturn: Array<Route> = [];
  singlepathRoutes(path) {
    for (var i = 0; i < path.length - 1; i++) {
      var q = this.routeList;
      this.routeArray.push(this.findRoute(path[i], path[i + 1]));
      this.routereturn.push(this.findRoute(path[i + 1], path[i]));
    }
    console.log(this.routeArray, "route arry");

    this.routereturn = this.routereturn.reverse();
  }

  citylist1(path) {
    for (var i = 0; i < path.length; i++) {
      for (var j = 0; j < this.cityList.length; j++) {
        if (path[i] == this.cityList[j].CityName) {
          this.cityArray.push(this.cityList[j]);
        }
      }
    }
  }

  Attractionpointlist(path) {
    for (var i = 0; i < path.length; i++) {
      this.findAttraction(path[i]);
    }
  }
  public totaldistance: number = 0;
  public totaltime: number = 0;

  totaldist() {
    for (var i = 0; i < this.routeArray.length; i++) {
      this.totaldistance = this.totaldistance + this.routeArray[i].Distance;
    }
    console.log("total dist", this.totaldistance);
  }

  Totaltime() {
    for (var i = 0; i < this.routeArray.length; i++) {
      this.totaltime = this.totaltime + this.routeArray[i].Time;
    }
    console.log("total time", this.totaltime);
  }

  findStopOver() {
    if (this.no_of_days) {
      var temptime = this.totaltime;
      var increment = 0;
      while (temptime > 600) {
        var time = 0;
        var stopover;
        var priority = 0;

        for (var i = increment; i < this.routeArray.length; i++) {
          if (time > 180 && time < 480) {
            var temp = this.cityArray.find(
              (a) => a.CityName === this.routeArray[i].EndPoint
            );
            if (priority < temp.StayPriority) {
              stopover = temp;
              priority = temp.StayPriority;
              increment = i + 1;
            }
          }
          time = time + this.routeArray[i].Time;
        }
        this.stopovercity.push(stopover);
        temptime = temptime - time;
      }
    }
    if (this.stopovercity.length > 0) {
      for (var i = 0; i < this.stopovercity.length; i++) {
        this.stopovercity[i].MaximumStop = 1;
      }
    }
    console.log(this.stopovercity);
  }
  public reverseStop: Array<City> = [];
  step3() {
    if (this.total_num_days > 5) {
      this.total_num_days = this.total_num_days - this.stopovercity.length;
      this.total_num_days = this.total_num_days - 1; //for Return
      console.log(this.total_num_days);
      if (
        this.total_num_days -
          this.cityArray[this.cityArray.length - 1].MaximumStop >
        0
      ) {
        this.total_num_days =
          this.total_num_days -
          this.cityArray[this.cityArray.length - 1].MaximumStop;
        var tempcities = this.cityArray;

        var cityarrayies = this.cityArray;
        while (this.total_num_days > 0) {
          console.log(cityarrayies, "adef");
          var tempcity = cityarrayies[0];
          var temppriority = 0;

          for (var j = 1; j < cityarrayies.length - 1; j++) {
            if (temppriority < cityarrayies[j].StayPriority) {
              temppriority = cityarrayies[j].StayPriority;
              tempcity = cityarrayies[j];
            }
          }
          this.reverseStop.push(tempcity);
          var tp = cityarrayies.indexOf(tempcity);

          cityarrayies = cityarrayies.filter((a) => a != tempcity);
          this.total_num_days = this.total_num_days - tempcity.MaximumStop;
        }
      } else {
        this.total_num_days = 0;
      }
    }
  }

  public attractionPointsGo: Array<AttractionPoint> = [];
  public attractionPointsBack: Array<AttractionPoint> = [];
  public attractionPointsDestination: Array<AttractionPoint> = [];

  public attr: number = 0;
  public ind: number = 0;

  attractionfind() {
    for (var i = 0; i < this.stopovercity.length; i++) {
      this.attr = 0;
      this.ind = 0;
      for (var j = 0; j < this.attractionArray.length; j++) {
        if (this.attractionArray[j].City == this.stopovercity[i].CityName) {
          if (this.attractionArray[j].Priority > this.attr) {
            this.attr = this.attractionArray[j].Priority;
            this.ind = j;
          }
        }
      }
      this.attractionPointsGo.push(this.attractionArray[this.ind]);
    }

    for (var i = 0; i < this.reverseStop.length; i++) {
      for (var j = 0; j < this.attractionArray.length; j++) {
        if (this.attractionArray[j].City == this.reverseStop[i].CityName) {
          this.attractionPointsBack.push(this.attractionArray[j]);
        }
      }
    }

    for (var j = 0; j < this.attractionArray.length; j++) {
      if (this.attractionArray[j].City == this.destination) {
        this.attractionPointsDestination.push(this.attractionArray[j]);
      }
    }
    console.log("Display all data");

    console.log(this.attractionPointsGo, "go");
    console.log(this.attractionPointsBack, "Back");
    console.log(this.attractionPointsDestination, "Destination");

    console.log(this.routeArray, "Route Array");
    console.log(this.cityArray, "City array");
    console.log(this.reverseStop, "Reverse stop");
    console.log(this.stopovercity, "Stop over city");

    console.log(this.total_num_days, "total number of days");
    console.log(this.finalalldays, "all days");
  }

  public itinerary: Array<Days> = [];

  public localiti: Array<Itinerary> = [];
  public remaining_days: number;
  public currentdays: number;
  public tempday: Days;

  tempreverse: Array<City> = [];

  attractionordering() {
    var i = 1;
    {
      for (var j = 0; j < this.attractionPointsGo.length; j++) {
        if (this.itinerary[i].AttractionPoints != null) {
          this.itinerary[i].AttractionPoints.push(this.attractionPointsGo[j]);
          i = i + 1;
        }
      }
      console.log(this.attractionPointsDestination);
      for (var j = 0; j < this.attractionPointsDestination.length; j++) {
        if (this.itinerary[i]) {
          console.log(this.itinerary[i]);
          this.itinerary[i].AttractionPoints.push(
            this.attractionPointsDestination[j]
          );
          i = i + 1;
        }
      }
    }
  }
  MakingItinerary() {
    this.remaining_days = this.finalalldays;
    this.currentdays = 0;

    this.settingenroute(this.currentdays);
    this.setdestination();
    this.setreturn();
    this.attractionordering();

    console.log(this.itinerary, "itinerary");
  }
  SettingHotels() {}

  setreturn() {
    console.log("set return", this.routereturn);
    var i = 0;
    for (var k = 0; k < this.routereturn.length; k++) {
      var cit = this.reverseStop.find(
        (a) => a.CityName == this.routereturn[k].StartPoint
      );
      if (cit) {
        var indd = 0;
        for (var j = 0; j < cit.MaximumStop; j++) {
          console.log(this.remaining_days, "ds");
          if (this.remaining_days > 0) {
            this.tempday = new Days();

            this.tempday.Dayno = this.currentdays;
            this.currentdays = this.currentdays + 1;
            this.remaining_days = this.remaining_days - 1;
            var tempp = this.attractionPointsBack.filter(
              (a) => a.City == cit.CityName
            );

            this.tempday.AttractionPoints.push(tempp[j]);

            this.tempday.cityname = cit.CityName;
            if (this.itinerary.length > 0) {
              this.tempday.fromcity = this.itinerary[
                this.itinerary.length - 1
              ].cityname;
            } else {
              this.tempday.fromcity = this.source;
            }

            this.itinerary.push(this.tempday);
          }
        }
      }
    }
  }
  setdestination() {
    console.log("set destination");
    var pop = this.cityArray.find((a) => a.CityName == this.destination);
    for (var i = 0; i < pop.MaximumStop; i++) {
      this.tempday = new Days();

      this.tempday.Dayno = this.currentdays;
      this.currentdays = this.currentdays + 1;
      this.remaining_days = this.remaining_days - 1;

      this.tempday.cityname = this.destination;
      if (this.itinerary.length > 0) {
        this.tempday.fromcity = this.itinerary[
          this.itinerary.length - 1
        ].cityname;
      } else {
        this.tempday.fromcity = this.source;
      }

      this.itinerary.push(this.tempday);
    }
  }

  settingenroute(day) {
    console.log("in setting routes");
    for (var i = day; i < this.stopovercity.length; i++) {
      this.tempday = new Days();

      this.tempday.Dayno = this.currentdays;
      this.currentdays = this.currentdays + 1;
      this.remaining_days = this.remaining_days - 1;

      this.tempday.cityname = this.stopovercity[i].CityName;
      if (this.itinerary.length > 0) {
        this.tempday.fromcity = this.itinerary[
          this.itinerary.length - 1
        ].cityname;
      } else {
        this.tempday.fromcity = this.source;
      }
      this.tempday.CurrentRoute = this.findingroutes(
        this.source,
        this.stopovercity[i].CityName
      );
      this.itinerary.push(this.tempday);
    }
  }
  public temparray: Array<Route>;

  findactivities(place) {
    var asa = this.attractionPointsGo.find((a) => a.City == place);
    console.log("asa", asa);
    return asa;
  }

  findingroutes(source, destination) {
    console.log("in finding routes");

    var jj = 0;
    this.temparray = [];
    console.log(this.routeArray);
    console.log(destination);
    var pop = this.routeArray[jj].EndPoint;
    while (pop != destination) {
      this.temparray.push(this.routeArray[jj]);
      jj = jj + 1;
      console.log(jj);

      pop = this.routeArray[jj].EndPoint;
    }
    this.temparray.push(this.routeArray[jj]);
    console.log(this.temparray, "temparray");
    return this.temparray;
  }

  public iti: Itinerary;
  public daysiti: Array<Days> = [];

  customizeItinerary() {
    this.iti = new Itinerary();
    this.iti.Destination = this.destination;
    this.iti.GroupType = "lol";
    this.iti.NoOfDays = parseInt(this.no_of_days);
    this.iti.NoOfPeople = 5;
    this.iti.PriceBracket = "3000";
    this.iti.TotalCost = 45000;

    this.daysiti = this.itinerary;

    this.iti.todo = this.daysiti;
    this.iti.scores = this.scorelist;

    this.itineraryService.additnerarylocal(this.iti);

    this.router.navigateByUrl("home/search2");
  }
  getCost() {
    this.iti = new Itinerary();
    this.iti.Destination = this.destination;
    this.iti.GroupType = "lol";
    this.iti.NoOfDays = parseInt(this.no_of_days);
    this.iti.NoOfPeople = 5;
    this.iti.PriceBracket = "3000";
    this.iti.TotalCost = 45000;

    this.daysiti = this.itinerary;

    this.iti.todo = this.daysiti;
    this.iti.scores = this.scorelist;

    this.itineraryService.addItinerary(this.iti);
  }
}
