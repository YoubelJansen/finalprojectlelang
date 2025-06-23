import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilihTenderPage } from './pilih-tender.page';

describe('PilihTenderPage', () => {
  let component: PilihTenderPage;
  let fixture: ComponentFixture<PilihTenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihTenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
