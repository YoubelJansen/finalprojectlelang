import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PemenangPoPage } from './pemenang-po.page';

describe('PemenangPoPage', () => {
  let component: PemenangPoPage;
  let fixture: ComponentFixture<PemenangPoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PemenangPoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
