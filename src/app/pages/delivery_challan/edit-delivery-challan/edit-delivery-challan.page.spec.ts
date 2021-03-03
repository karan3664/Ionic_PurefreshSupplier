import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDeliveryChallanPage } from './edit-delivery-challan.page';

describe('EditDeliveryChallanPage', () => {
  let component: EditDeliveryChallanPage;
  let fixture: ComponentFixture<EditDeliveryChallanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryChallanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeliveryChallanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
