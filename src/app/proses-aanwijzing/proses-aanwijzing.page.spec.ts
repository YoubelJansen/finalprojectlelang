import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProsesAanwijzingPage } from './proses-aanwijzing.page';

describe('ProsesAanwijzingPage', () => {
  let component: ProsesAanwijzingPage;
  let fixture: ComponentFixture<ProsesAanwijzingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsesAanwijzingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
