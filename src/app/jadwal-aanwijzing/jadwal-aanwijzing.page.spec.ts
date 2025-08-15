import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JadwalAanwijzingPage } from './jadwal-aanwijzing.page';

describe('JadwalAanwijzingPage', () => {
  let component: JadwalAanwijzingPage;
  let fixture: ComponentFixture<JadwalAanwijzingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JadwalAanwijzingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
