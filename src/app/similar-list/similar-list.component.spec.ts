import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarListComponent } from './similar-list.component';

describe('SimilarListComponent', () => {
  let component: SimilarListComponent;
  let fixture: ComponentFixture<SimilarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
