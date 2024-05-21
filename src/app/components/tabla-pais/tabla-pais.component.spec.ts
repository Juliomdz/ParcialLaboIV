import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPaisComponent } from './tabla-pais.component';

describe('TablaPaisComponent', () => {
  let component: TablaPaisComponent;
  let fixture: ComponentFixture<TablaPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
