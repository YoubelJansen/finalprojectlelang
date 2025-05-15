import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenderPage } from './tender.page';

describe('TenderPage', () => {
  let component: TenderPage;
  let fixture: ComponentFixture<TenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
