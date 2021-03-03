import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPurchaseorderPage } from './detail-purchaseorder.page';

describe('DetailPurchaseorderPage', () => {
  let component: DetailPurchaseorderPage;
  let fixture: ComponentFixture<DetailPurchaseorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPurchaseorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPurchaseorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
