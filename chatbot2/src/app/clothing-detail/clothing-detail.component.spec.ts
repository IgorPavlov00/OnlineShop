import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingDetailComponent } from './clothing-detail.component';

describe('ClothingDetailComponent', () => {
  let component: ClothingDetailComponent;
  let fixture: ComponentFixture<ClothingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothingDetailComponent]
    });
    fixture = TestBed.createComponent(ClothingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
