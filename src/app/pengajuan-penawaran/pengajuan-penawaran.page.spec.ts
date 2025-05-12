import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengajuanPenawaranPage } from './pengajuan-penawaran.page';

describe('PengajuanPenawaranPage', () => {
  let component: PengajuanPenawaranPage;
  let fixture: ComponentFixture<PengajuanPenawaranPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanPenawaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
