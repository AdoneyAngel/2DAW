import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductosComponentComponent } from './productos-component/productos-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductosComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TejeraSantanaAdoney_AA31_Angular_Proyecto';
}
