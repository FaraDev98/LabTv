import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresPreviewComponent } from './genres-preview.component';

describe('GenresPreviewComponent', () => {
  let component: GenresPreviewComponent;
  let fixture: ComponentFixture<GenresPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenresPreviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenresPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
