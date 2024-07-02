import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarElementoComponent } from './modificar-elemento.component';

describe('ModificarElementoComponent', () => {
  let component: ModificarElementoComponent;
  let fixture: ComponentFixture<ModificarElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarElementoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
