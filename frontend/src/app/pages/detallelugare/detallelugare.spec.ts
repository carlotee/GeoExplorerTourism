import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detallelugare } from './detallelugare';

describe('Detallelugare', () => {
  let component: Detallelugare;
  let fixture: ComponentFixture<Detallelugare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detallelugare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detallelugare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
