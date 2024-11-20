import { Component } from '@angular/core';
import { CategoriaImpl } from '../../model/CategoriaImpl';

@Component({
  selector: 'app-lacteos',
  standalone: true,
  imports: [],
  templateUrl: './lacteos.component.html',
  styleUrl: './lacteos.component.css'
})
export class LacteosComponent {
  lacteos = [
    new CategoriaImpl(0, "Leche", "Leche de baca"),
    new CategoriaImpl(1, "Queso", "Queso de 1m de radio")
  ]
}
