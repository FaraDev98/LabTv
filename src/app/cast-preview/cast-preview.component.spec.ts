import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastPreviewComponent } from './cast-preview.component';

describe('CastPreviewComponent', () => {
  let component: CastPreviewComponent;
  let fixture: ComponentFixture<CastPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
