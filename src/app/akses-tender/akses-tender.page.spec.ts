import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AksesTenderPage } from './akses-tender.page';

describe('AksesTenderPage', () => {
  let component: AksesTenderPage;
  let fixture: ComponentFixture<AksesTenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AksesTenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
