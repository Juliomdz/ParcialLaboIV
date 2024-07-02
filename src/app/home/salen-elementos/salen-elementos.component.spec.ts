import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalenElementosComponent } from './salen-elementos.component';

describe('SalenElementosComponent', () => {
  let component: SalenElementosComponent;
  let fixture: ComponentFixture<SalenElementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalenElementosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalenElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
