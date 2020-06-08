import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/model/rooms.model';
import { HotelService } from 'src/app/services/hotel.service';
import { from } from 'rxjs';
import { ItineraryDays } from 'src/app/model/itinerary-days.model';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { RoomType } from 'src/app/model/room-type.model';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


class both {
  hotel: Rooms;
  roomtype: RoomType[];
  imgsrc: any;
}



@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})

export class HotelViewComponent implements OnInit {


  //hotel: Rooms[];
  itinerarydays: RoomType[] = [];
  itinerarydays2: AttractionPoint[] = [];


  all: both[] = [];

  public check: number = 0;
  public len: number;
  public hotelservice: Array<string> = [];

  hotelList: Rooms[];
  public check1: number = 0;
  public tok: any = null;
  public checkerror: number = 0;
  public imgsrcs: Array<any> = [];


  constructor(public hotelService: HotelService, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log("sddc");
    this.getData();
  }

  ngAfterViewChecked() {
    if (this.hotelList && this.check == 0) {
      if (this.hotelList.length > 0) {
        console.log(this.hotelList, "as")
        this.check = 1;

        console.log(this.hotelList);
        console.log(this.imgsrcs);
        for (var i = 0; i < this.hotelList.length; i++) {
          for (let key in this.hotelList[i].imgsrcs) {
            this.hotelList[i].imgsrcs[key] = this.sanitizer.bypassSecurityTrustUrl(key);
            this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

            this.all.push({ hotel: this.hotelList[i], roomtype: this.hotelList[i].roomTypes, imgsrc: this.hotelList[i].imgsrcs[key] })

            break;
          }
        }
        console.log(this.all, "dsds");
      }
    }
  }

  getData() {
    this.hotelService.getAllHotels().subscribe(data => {
      this.hotelList = data;
      console.log(data, "dfasd");
    })
  }

  onDelete(id: string) {
    this.hotelService.deleteHotel(id).subscribe((data: any) =>
      this.tok = data
    )
  }


}

