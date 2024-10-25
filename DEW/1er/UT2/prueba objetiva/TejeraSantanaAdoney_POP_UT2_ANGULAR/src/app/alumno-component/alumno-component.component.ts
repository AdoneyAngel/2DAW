import { Component } from '@angular/core';

@Component({
  selector: 'app-alumno-component',
  standalone: true,
  imports: [],
  templateUrl: './alumno-component.component.html',
  styleUrl: './alumno-component.component.css'
})
export class AlumnoComponentComponent {
  alumno = {
    id: 1,
    nombre: "Tejera Santana Adoney",
    edad: 19,
    curso: "2DAW"
  }
}
