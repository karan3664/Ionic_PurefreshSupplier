import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceivePurchaseorderRequestPage } from './receive-purchaseorder-request.page';

describe('ReceivePurchaseorderRequestPage', () => {
  let component: ReceivePurchaseorderRequestPage;
  let fixture: ComponentFixture<ReceivePurchaseorderRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivePurchaseorderRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivePurchaseorderRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
