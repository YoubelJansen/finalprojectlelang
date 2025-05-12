import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuatTenderPage } from './buat-tender.page';

describe('BuatTenderPage', () => {
  let component: BuatTenderPage;
  let fixture: ComponentFixture<BuatTenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuatTenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
