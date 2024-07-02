import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleElementoComponent } from './detalle-elemento.component';

describe('DetalleElementoComponent', () => {
  let component: DetalleElementoComponent;
  let fixture: ComponentFixture<DetalleElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleElementoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
