import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateDeliveryChallanPage } from './generate-delivery-challan.page';

describe('GenerateDeliveryChallanPage', () => {
  let component: GenerateDeliveryChallanPage;
  let fixture: ComponentFixture<GenerateDeliveryChallanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDeliveryChallanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateDeliveryChallanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
