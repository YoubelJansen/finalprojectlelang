import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KelolaPengadaanPage } from './kelola-pengadaan.page';

describe('KelolaPengadaanPage', () => {
  let component: KelolaPengadaanPage;
  let fixture: ComponentFixture<KelolaPengadaanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KelolaPengadaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
