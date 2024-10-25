import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlumnoComponentComponent } from './alumno-component/alumno-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlumnoComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TejeraSantanaAdoney_POP_UT2_ANGULAR';
}
