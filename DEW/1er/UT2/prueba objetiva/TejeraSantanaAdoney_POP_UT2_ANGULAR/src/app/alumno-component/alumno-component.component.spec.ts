import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoComponentComponent } from './alumno-component.component';

describe('AlumnoComponentComponent', () => {
  let component: AlumnoComponentComponent;
  let fixture: ComponentFixture<AlumnoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
