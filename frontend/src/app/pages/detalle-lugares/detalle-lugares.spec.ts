import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLugares } from './detalle-lugares';

describe('DetalleLugares', () => {
  let component: DetalleLugares;
  let fixture: ComponentFixture<DetalleLugares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleLugares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLugares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
