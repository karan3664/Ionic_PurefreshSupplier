import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDcPage } from './edit-dc.page';

describe('EditDcPage', () => {
  let component: EditDcPage;
  let fixture: ComponentFixture<EditDcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
