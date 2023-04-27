import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTitleComponent } from './single-title.component';

describe('SingleTitleComponent', () => {
  let component: SingleTitleComponent;
  let fixture: ComponentFixture<SingleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTitleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
