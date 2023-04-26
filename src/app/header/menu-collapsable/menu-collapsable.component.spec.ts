import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCollapsableComponent } from './menu-collapsable.component';

describe('MenuCollapsableComponent', () => {
  let component: MenuCollapsableComponent;
  let fixture: ComponentFixture<MenuCollapsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCollapsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCollapsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
