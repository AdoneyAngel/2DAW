import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComponentComponent } from './productos-component.component';

describe('ProductosComponentComponent', () => {
  let component: ProductosComponentComponent;
  let fixture: ComponentFixture<ProductosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
