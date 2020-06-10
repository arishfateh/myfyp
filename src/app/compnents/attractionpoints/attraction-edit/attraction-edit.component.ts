import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { AttractionPointService } from "src/app/services/attraction-point.service";
import { AttractionPoint } from "src/app/model/attraction-point.model";
import { ForallService } from "src/app/services/forall.service";
import { timer } from "rxjs";
import { delay } from "rxjs-compat/operator/delay";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-attraction-edit",
  templateUrl: "./attraction-edit.component.html",
  styleUrls: ["./attraction-edit.component.css"],
})
export class AttractionEditComponent implements OnInit {
  exampleForm: FormGroup;
  item: any;

  public base64textString = "";
  public imgsrcs: Array<any> = [];
  // Validators and their validation messages for all the required fields for attraction points
  validation_messages = {
    AttractionName: [
      { type: "required", message: "Attraction Name is required." },
    ],
    City: [{ type: "required", message: "City is required." }],
    Type: [{ type: "required", message: "Type is required." }],
    Priority: [{ type: "required", message: "Priority is required." }],
    Time: [{ type: "required", message: "Time is required." }],
    travelDistance: [
      { type: "required", message: "travelDistance is required." },
    ],
    travelTime: [{ type: "required", message: "travelTime is required." }],
    Price: [{ type: "required", message: "Price is required." }],
    Description: [{ type: "required", message: "Description is required." }],
    timeSlots: [{ type: "required", message: "timeSlots is required." }],
  };
  attractionList: AttractionPoint[];
  public attraction: AttractionPoint = null;
  public attraction1: AttractionPoint = new AttractionPoint();

  public check: number = 0;
  public len: number;

  constructor(
    public attractionPointService: AttractionPointService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public Service: AttractionPointService,
    public foral: ForallService,
    private sanitizer: DomSanitizer
  ) {}
  public type: Array<string> = ["adventurous", "aesthetic", "All"]; // Type of attaction point
  public disp: string = null;
  ngOnInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    if (this.attraction && this.check == 0) {
      this.check = 1;
      console.log("a");
      this.createForm();
      this.disp = "ds";

      for (let key in this.attraction.imgsrcs) {
        this.attraction1.imgsrcs = this.attraction.imgsrcs;
        this.attraction.imgsrcs[key] = this.sanitizer.bypassSecurityTrustUrl(
          key
        );
        this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

        break;
      }
    }
  }
  // Fetch the data of the respective attraction point that user has selected to edit
  getData(): AttractionPoint {
    this.route.params.subscribe((param) => {
      this.attractionPointService
        .getAttractionPoint(param["id"], this.attraction)
        .then(
          (res) => {
            this.attraction = res;
            console.log(this.attraction, "iddddd");
          }
          //console.log(this.propertyService.getProperty(param['id']), " ;lj");
        );
    });
    return this.attraction;
  }

  // Form creater with alll validators and the required fields are set for which database schema is built upon
  createForm() {
    console.log("in create form", this.attraction);
    this.exampleForm = this.fb.group({
      AttractionName: [this.attraction.AttractionName, Validators.required],
      City: [this.attraction.City, Validators.required],
      Price: [this.attraction.Price, Validators.required],
      Time: [this.attraction.Time, Validators.required],
      Priority: [this.attraction.Priority, Validators.required],
      Type: [this.attraction.Type, Validators.required],
      travelDistance: [this.attraction.travelDistance, Validators.required],
      travelTime: [this.attraction.travelTime, Validators.required],
      Description: [this.attraction.Description, Validators.required],
      timeSlots: [this.attraction.timeSlots, Validators.required],
    });
  }

  // Submitting the data to commit the editied changes to that specific attaction point
  onSubmit(value) {
    //this.attractionService.insert(value);
    console.log(value);

    this.attraction1.AttractionName = value["AttractionName"];
    this.attraction1.City = value["City"];
    this.attraction1.Description = value["Description"];

    this.attraction1.Price = value["Price"];
    this.attraction1.Priority = value["Priority"];
    this.attraction1.Time = value["Time"];
    this.attraction1.Type = value["Type"];

    this.attraction1.timeSlots = value["timeSlots"];
    this.attraction1.travelDistance = value["travelDistance"];
    this.attraction1.travelTime = value["travelTime"];

    console.log("sdf");
    this.route.params.subscribe((params) => {
      this.attractionPointService.updateAttractionPoint(
        params["id"],
        this.attraction1
      );
    });
    console.log("fssdf");
    setTimeout(() => {
      this.router.navigate(["home/attraction/view"]);
    }, 2);
  }

  // Selection of the file even handler.
  handleFileSelect(evt) {
    const files = evt.target.files;
    // var file = files[0];
    if (files) {
      Array.from(files).forEach((file) => {
        const f = file as File;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(f);
      });
    }
  }

  // Reload Event handler, what happens when it is reloaded

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log('data:image/png;charset=utf-8;base64,' + this.base64textString);

    this.attraction1.imgsrcs[
      "data:image/png;charset=utf-8;base64," + this.base64textString
    ] = this.sanitizer.bypassSecurityTrustUrl(
      "data:image/png;charset=utf-8;base64," + this.base64textString
    );
    this.imgsrcs.push(
      this.sanitizer.bypassSecurityTrustUrl(
        "data:image/png;charset=utf-8;base64," + this.base64textString
      )
    );
    //  console.log(btoa(binaryString));
    console.log(this.attraction1);
  }
  // Remove the added images that were present
  removeImage(ims) {
    this.imgsrcs = this.imgsrcs.filter((obj) => obj != ims);

    for (const key in this.attraction1.imgsrcs) {
      if (
        JSON.stringify(this.attraction1.imgsrcs[key]).toLowerCase() ===
        JSON.stringify(ims).toLowerCase()
      ) {
        console.log("same idea");
        delete this.attraction1.imgsrcs[key];
      }
    }
  }

  // Return back to Home page
  cancel() {
    this.router.navigate(["/home"]);
  }
}
