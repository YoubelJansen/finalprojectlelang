import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HalamanUtamaVendorPage } from './halaman-utama-vendor.page';

describe('HalamanUtamaVendorPage', () => {
  let component: HalamanUtamaVendorPage;
  let fixture: ComponentFixture<HalamanUtamaVendorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanUtamaVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
