import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KelolaVendorPage } from './kelola-vendor.page';

describe('KelolaVendorPage', () => {
  let component: KelolaVendorPage;
  let fixture: ComponentFixture<KelolaVendorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KelolaVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
