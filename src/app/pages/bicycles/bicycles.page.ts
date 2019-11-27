import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bicycle, DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.page.html',
  styleUrls: ['./bicycles.page.scss'],
})
export class BicyclesPage implements OnInit {
  
  bicycles: Bicycle[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getBicycles().subscribe(bicycles => {
          console.log("tibu: llegó");
          this.bicycles = bicycles;
          console.log("tibu: " + JSON.stringify(bicycles));
          console.log("tibu: " + JSON.stringify(this.bicycles));
        });
      }
    });
  }

}
