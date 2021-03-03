import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PricingDetailsPage } from './pricing-details.page';

describe('PricingDetailsPage', () => {
  let component: PricingDetailsPage;
  let fixture: ComponentFixture<PricingDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PricingDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
