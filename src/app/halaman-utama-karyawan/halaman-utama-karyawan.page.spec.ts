import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HalamanUtamaKaryawanPage } from './halaman-utama-karyawan.page';

describe('HalamanUtamaKaryawanPage', () => {
  let component: HalamanUtamaKaryawanPage;
  let fixture: ComponentFixture<HalamanUtamaKaryawanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanUtamaKaryawanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
