import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDiscoverComponent } from './movies-discover.component';

describe('MoviesDiscoverComponent', () => {
  let component: MoviesDiscoverComponent;
  let fixture: ComponentFixture<MoviesDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesDiscoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
