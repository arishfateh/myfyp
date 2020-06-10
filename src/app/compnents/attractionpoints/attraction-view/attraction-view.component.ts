import { Component, OnInit } from "@angular/core";
import { AttractionPoint } from "src/app/model/attraction-point.model";
import { AttractionPointService } from "src/app/services/attraction-point.service";
import { MatSnackBar, MatSpinner } from "@angular/material";
import { ForallService } from "src/app/services/forall.service";
import { DomSanitizer } from "@angular/platform-browser";

class AttractionTemp {
  p: AttractionPoint;
  imgsrc: any;
}

@Component({
  selector: "app-attraction-view",
  templateUrl: "./attraction-view.component.html",
  styleUrls: ["./attraction-view.component.css"],
})
export class AttractionViewComponent implements OnInit {
  attractionList: AttractionPoint[];
  public attraction: AttractionPoint;
  public check: number = 0;
  public check1: number = 0;

  public all: Array<AttractionTemp> = [];

  public len: number;
  public tok: any = null;
  public checkerror: number = 0;
  displayedColumns: string[] = [
    "AttractionName",
    "City",
    "Type",
    "Price",
    "Priority",
    "timeSlots",
    "Time",
    "actions",
  ];

  public imgsrcs: Array<any> = [];

  constructor(
    public Service: AttractionPointService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public foral: ForallService
  ) {}

  ngOnInit() {
    this.getData();
  }
  // Attraction list is filled with data
  ngAfterViewChecked() {
    if (this.attractionList) {
      if (this.attractionList.length > 0 && this.check == 0) {
        this.check = 1;

        console.log(this.attractionList);
        console.log(this.imgsrcs);
        for (var i = 0; i < this.attractionList.length; i++) {
          for (let key in this.attractionList[i].imgsrcs) {
            this.attractionList[i].imgsrcs[
              key
            ] = this.sanitizer.bypassSecurityTrustUrl(key);
            this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

            this.all.push({
              p: this.attractionList[i],
              imgsrc: this.attractionList[i].imgsrcs[key],
            });

            break;
          }
        }
        console.log(this.all);
      }
      if (this.tok) {
        if (this.tok != "Deleted Successfully" && this.checkerror == 0) {
          this.snackBar.open("Could not delete", null, {
            duration: 2000,
            panelClass: ["error-snackbar"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        } else if (
          this.tok &&
          this.check1 === 0 &&
          this.tok === "Deleted Successfully"
        ) {
          this.snackBar.open("Attraction Point Deleted", null, {
            duration: 3000,
            panelClass: ["success-snackbar"],
            horizontalPosition: "right",
            verticalPosition: "top",
          });

          this.check1 = 1;
          window.location.reload();
        }
      }
    }
  }
  //fetch data of the attaction point
  getData() {
    this.Service.getAllAttractionPoints().subscribe((data) => {
      this.attractionList = data;
    });
    this.attractionList.forEach((value) => {
      console.log(value, "daasd");
    });
  }

  //Deletion of the selected attraction point
  onDelete(id) {
    this.Service.deleteAttractionPoint(id).subscribe(
      (data: any) => (this.tok = data)
    );
  }
}
