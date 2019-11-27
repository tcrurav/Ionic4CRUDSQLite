import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Bicycle, DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.page.html',
  styleUrls: ['./bicycle.page.scss'],
})
export class BicyclePage implements OnInit {

  // public bicycleForm: FormGroup;
  // public submitAttempt: boolean = false;

  private bicycle: Bicycle = { id: 0, brand: '', model: '', year: 0 };

  constructor(private db: DatabaseService, private location: Location,
    private route: ActivatedRoute, public loading: LoadingService,
    public formBuilder: FormBuilder
  ) {
    // this.bicycleForm = formBuilder.group({
    //   brand: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    //   model: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    //   year: ['', Validators.required]
    // });
  }

  ngOnInit() {
    console.log("tibu: ngOnInit()");
    this.route.paramMap.subscribe(params => {
      let bicycleId = parseInt(params.get('id'));

      if (bicycleId != 0) {
        this.db.getBicycle(bicycleId).then(data => {
          // this.bicycleForm.setValue({ brand: data.brand, model: data.model, year: data.year});
          this.bicycle = data;
        });
      } else {
        document.getElementById("delete-button-up").style.display = "none";
        document.getElementById("delete-button-down").style.display = "none";
      }
    });
  }

  saveBicycle() {
    console.log("tibu: addBicycle()");

    // this.submitAttempt = true;

    // if (this.bicycleForm.valid) {

      this.loading.present();

      if (this.bicycle.id == 0) {
        this.db.insertBicycle(this.bicycle).then((res) => {
          console.log("tibu: addBicycle() before going back");
          this.loading.dismiss();
          this.location.back();
        });
      } else {
        this.db.updateBicycle(this.bicycle).then((res) => {
          console.log("tibu: updateBicycle() before going back");
          this.loading.dismiss();
          this.location.back();
        });
      }
    // }

  }

  deleteBicycle() {
    this.loading.present();

    this.db.deleteBicycle(this.bicycle.id).then(() => {
      this.loading.dismiss();
      this.location.back();
    });
  }

}
