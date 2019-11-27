import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BicyclePage } from './bicycle.page';

describe('BicyclePage', () => {
  let component: BicyclePage;
  let fixture: ComponentFixture<BicyclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicyclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BicyclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
