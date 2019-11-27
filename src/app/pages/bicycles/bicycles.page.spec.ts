import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicyclesPage } from './bicycles.page';

describe('BicyclesPage', () => {
  let component: BicyclesPage;
  let fixture: ComponentFixture<BicyclesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicyclesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicyclesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
