import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusPengajuanPage } from './status-pengajuan.page';

describe('StatusPengajuanPage', () => {
  let component: StatusPengajuanPage;
  let fixture: ComponentFixture<StatusPengajuanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPengajuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
