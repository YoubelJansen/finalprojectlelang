import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrasiVendorPage } from './registrasi-vendor.page';

describe('RegistrasiVendorPage', () => {
  let component: RegistrasiVendorPage;
  let fixture: ComponentFixture<RegistrasiVendorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrasiVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
