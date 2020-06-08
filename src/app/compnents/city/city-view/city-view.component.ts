import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/model/city.model';
import { CityService } from 'src/app/services/city.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ForallService } from 'src/app/services/forall.service';
@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.css']
})
export class CityViewComponent implements OnInit {


  displayedColumns: string[] = ['CityName', 'StayPriority', 'Longitude', 'Latitude', 'MaximumStop', 'actions'];

  routeList: City[];
  public check: number = 0;
  public len: number;
  public check1: number = 0;


  public tok: any = null;
  public checkerror: number = 0;
  constructor(public Service: CityService, private snackBar: MatSnackBar, public foral: ForallService) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    if (this.routeList && this.check == 0) {
      this.len = this.routeList.length;
      this.check = 1;

    }
    if (this.tok) {


      if (this.tok != "Deleted Successfully" && this.checkerror == 0) {
        this.snackBar.open("Could not delete", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      }

      else if (this.tok && this.check1 === 0 && this.tok === "Deleted Successfully") {

        this.snackBar.open("City Deleted", null, {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });


        this.check1 = 1;
        window.location.reload();

      }



    }

  }


  getData() {

    this.Service.getAllCity().subscribe(data => {
      this.routeList = data;
    })

    this.routeList.forEach(value => {
      console.log(value, 'daasd')
    })


  }

  onDelete(id: string) {
    this.Service.deleteCity(id).subscribe((data: any) =>
      this.tok = data
    )
  }
}
