import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LacteosComponent } from './lacteos/lacteos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LacteosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TejeraSantanaAdoney_AA_43';
}
