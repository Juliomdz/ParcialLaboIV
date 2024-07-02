import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoElementosComponent } from './listado-elementos.component';

describe('ListadoElementosComponent', () => {
  let component: ListadoElementosComponent;
  let fixture: ComponentFixture<ListadoElementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoElementosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
