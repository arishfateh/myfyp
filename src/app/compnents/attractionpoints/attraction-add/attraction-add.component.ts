import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { ForallService } from 'src/app/services/forall.service';

import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AttractionPoint } from 'src/app/model/attraction-point.model';

@Component({
  selector: 'app-attraction-add',
  templateUrl: './attraction-add.component.html',
  styleUrls: ['./attraction-add.component.css']
})
export class AttractionAddComponent implements OnInit {


  exampleForm: FormGroup;
  public base64textString = '';
  public imgsrcs: Array<any> = [];
  public attraction: AttractionPoint = new AttractionPoint;

  validation_messages = {
    'AttractionName': [
      { type: 'required', message: 'Attraction Name is required.' }
    ],
    'City': [
      { type: 'required', message: 'City is required.' }
    ],
    'Type': [
      { type: 'required', message: 'Type is required.' },
    ],
    'Priority': [
      { type: 'required', message: 'Priority is required.' },
    ],
    'Time': [
      { type: 'required', message: 'Time is required.' },
    ],
    'travelDistance': [
      { type: 'required', message: 'travelDistance is required.' },
    ],
    'travelTime': [
      { type: 'required', message: 'travelTime is required.' },
    ],
    'Price': [
      { type: 'required', message: 'Price is required.' },
    ]
    ,
    'Description': [
      { type: 'required', message: 'Description is required.' },
    ],
    'timeSlots': [
      { type: 'required', message: 'timeSlots is required.' },
    ],

  };

  public type: Array<string> = ['adventurous', 'aesthetic', 'All'];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public attractionService: AttractionPointService,
    public cityService: CityService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer

  ) { }

  routeList: City[];
  public check: number = 0;
  public len: number;

  ngOnInit() {
    this.getcityData();
    this.createForm();
  }
  public checking: number = 0;
  public disp: string = null;
  ngAfterViewChecked() {
    if (this.routeList && this.check == 0) {
      this.len = this.routeList.length;
      this.check = 1;

    }
    if (this.routeList) {
      if (this.routeList.length > 0 && this.checking == 0) {
        console.log(this.routeList)
        this.disp = "csdc";
        this.checking = 1;
      }

    }
  }
  getcityData() {


    this.cityService.getAllCity().subscribe(data => {
      this.routeList = data;
    })


  }

  createForm() {
    this.exampleForm = this.fb.group({
      AttractionName: ['', Validators.required],
      City: ['', Validators.required],
      Price: ['', Validators.required],
      Time: ['', Validators.required],
      Priority: ['', Validators.required],
      Type: ['', Validators.required],
      travelDistance: ['', Validators.required],
      travelTime: ['', Validators.required],
      Description: ['', Validators.required],
      timeSlots: ['', Validators.required],

    });
  }



  resetFields() {

    this.exampleForm = this.fb.group({
      AttractionName: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      Time: new FormControl('', Validators.required),
      Priority: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      travelDistance: new FormControl('', Validators.required),
      travelTime: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      timeSlots: new FormControl('', Validators.required),
    });
    this.imgsrcs = [];
  }


  onSubmit(value) {
    //this.attractionService.insert(value);
    console.log(value)

    this.attraction.AttractionName = value["AttractionName"];
    this.attraction.City = value["City"];
    this.attraction.Description = value["Description"];

    this.attraction.Price = value["Price"];
    this.attraction.Priority = value["Priority"];
    this.attraction.Time = value["Time"];
    this.attraction.Type = value["Type"];

    this.attraction.timeSlots = value["timeSlots"];
    this.attraction.travelDistance = value["travelDistance"];
    this.attraction.travelTime = value["travelTime"];


    console.log(this.attraction);
    this.attractionService.addAtr(this.attraction);
    this.resetFields();
    this.snackBar.open("Attraction Point added successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


  handleFileSelect(evt) {
    const files = evt.target.files;
    // var file = files[0];
    if (files) {

      Array.from(files).forEach(file => {
        const f = file as File;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(f);
      });

    }
  }





  _handleReaderLoaded(readerEvt) {

    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log('data:image/png;charset=utf-8;base64,' + this.base64textString);

    this.attraction.imgsrcs['data:image/png;charset=utf-8;base64,' + this.base64textString] =
      this.sanitizer.bypassSecurityTrustUrl('data:image/png;charset=utf-8;base64,' + this.base64textString);
    this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;charset=utf-8;base64,' + this.base64textString));
    //  console.log(btoa(binaryString));
    console.log(this.attraction);
  }

  removeImage(ims) {
    this.imgsrcs = this.imgsrcs.filter(obj => obj != ims);

    for (const key in this.attraction.imgsrcs) {
      if (JSON.stringify(this.attraction.imgsrcs[key]).toLowerCase() === JSON.stringify(ims).toLowerCase()) {
        console.log('same idea');
        delete this.attraction.imgsrcs[key];
      }

    }

  }


}