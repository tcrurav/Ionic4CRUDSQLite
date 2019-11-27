import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';

// For validation: https://github.com/ionicthemes/ionic-forms-and-validations/blob/master/src/app/form/form.page.html
// For SQLite: 

export interface Bicycle {
  id: number,
  brand: string,
  model: string,
  year: number
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private bicycles: BehaviorSubject<Bicycle[]> = new BehaviorSubject([]);
  private databaseObj: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log("tibu: " + JSON.stringify(error));
    })
  }

  createDB() {
    this.sqlite.create({
      name: "bicycles.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
      console.log('tibu: Bicycles Database Created!');
      //create table
      this.createTableBicycles();
    }).catch(e => {
      console.log("tibu: error " + JSON.stringify(e));
    });
  }

  createTableBicycles() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS bicycles (id INTEGER PRIMARY KEY, brand varchar(255), model varchar(255), year integer)', [])
      .then(() => {
        console.log('tibu: Table Created!');
        // this.seedTableBicycles();
        this.dbReady.next(true);
      })
      .catch(e => {
        console.log("tibu: error " + JSON.stringify(e));
      });
  }

  // seedTableBicycles() {
  //   this.databaseObj.executeSql("INSERT or IGNORE INTO bicycles VALUES (1, 'BH', 'star', 1982)", [])
  //     .then(() => {
  //       console.log('tibu: seed Table');
  //       this.loadBicycles();
  //       this.dbReady.next(true);
  //     })
  //     .catch(e => {
  //       console.log("tibu: error " + JSON.stringify(e));
  //     });
  // }

  getDatabaseState() {
    console.log('tibu: getDatabaseState');
    return this.dbReady.asObservable();
  }

  insertBicycle(bicycle: Bicycle) {
    return this.databaseObj.executeSql("INSERT INTO bicycles (brand, model, year) VALUES ('" + bicycle.brand + "', '" + bicycle.model + "', " + bicycle.year + ")", [])
      .then(() => {
        console.log('tibu: Bicycle Inserted!');
        this.loadBicycles();
      })
      .catch(e => {
        console.log("tibu: error " + JSON.stringify(e))
      });
  }

  updateBicycle(bicycle: Bicycle) {
    let data = [bicycle.brand, bicycle.model, bicycle.year];
    return this.databaseObj.executeSql(`UPDATE bicycles SET brand = ?, model = ?, year = ? WHERE id = ${bicycle.id}`, data).then(data => {
      this.loadBicycles();
    })
  }

  getBicycle(id): Promise<Bicycle> {
    return this.databaseObj.executeSql('SELECT * FROM bicycles WHERE id = ?', [id]).then(data => { 
      return {
        id: data.rows.item(0).id,
        brand: data.rows.item(0).brand,
        model: data.rows.item(0).model,
        year: data.rows.item(0).year,
      }
    });
  }

  getBicycles() {
    console.log('tibu: getBicycles');
    return this.bicycles.asObservable();
  }

  loadBicycles() {
    console.log('tibu: loadBicycles');
    return this.databaseObj.executeSql("SELECT * FROM bicycles", []).then((res) => {

      let bicycles: Bicycle[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          bicycles.push({
            id: res.rows.item(i).id,
            brand: res.rows.item(i).brand,
            model: res.rows.item(i).model,
            year: res.rows.item(i).year,
          });
        }
      }

      console.log('tibu: Bicycles loaded, ' + JSON.stringify(bicycles));

      this.bicycles.next(bicycles);
    })
      .catch(e => {
        console.log("tibu: error " + JSON.stringify(e));
      });
  }

  deleteBicycle(itemId) {
    return this.databaseObj.executeSql("DELETE FROM bicycles WHERE id = " + itemId, [])
      .then((res) => {
        console.log("tibu: Bicycle Deleted!");
        this.loadBicycles();
      })
      .catch(e => {
        console.log("tibu: error " + JSON.stringify(e));
      });
  }
}
