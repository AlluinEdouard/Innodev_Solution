import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [NgIf, NgFor],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  teamMembers = [
    {
      name: 'Valentin',
      role: 'Gérant, Développeur FullStack',
      photo: 'assets/valentin.png'
    },
    {
      name: 'Cédrick',
      role: 'Développeur FullStack',
      photo: 'assets/cedrick.png'
    },
    {
      name: 'Samuel',
      role: 'Développeur FullStack',
      photo: 'assets/samuel.png'
    },
    {
      name: 'Corentin',
      role: 'Développeur FullStack',
      photo: 'assets/corentin.png'
    }
  ];
}