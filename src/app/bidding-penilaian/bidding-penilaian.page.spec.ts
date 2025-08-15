import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiddingPenilaianPage } from './bidding-penilaian.page';

describe('BiddingPenilaianPage', () => {
  let component: BiddingPenilaianPage;
  let fixture: ComponentFixture<BiddingPenilaianPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingPenilaianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
