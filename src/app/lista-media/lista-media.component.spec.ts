import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMediaComponent } from './lista-media.component';

describe('ListaMediaComponent', () => {
  let component: ListaMediaComponent;
  let fixture: ComponentFixture<ListaMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
