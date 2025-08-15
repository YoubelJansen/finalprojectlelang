import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanPermintaanPage } from './pengajuan-permintaan.page';

describe('PengajuanPermintaanPage', () => {
  let component: PengajuanPermintaanPage;
  let fixture: ComponentFixture<PengajuanPermintaanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanPermintaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
