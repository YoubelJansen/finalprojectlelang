import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HalamanUtamaAtasanPage } from './halaman-utama-atasan.page';

describe('HalamanUtamaAtasanPage', () => {
  let component: HalamanUtamaAtasanPage;
  let fixture: ComponentFixture<HalamanUtamaAtasanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanUtamaAtasanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
