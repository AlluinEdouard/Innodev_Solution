import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DevSurMesureComponent } from './dev-sur-mesure/dev-sur-mesure.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { SiteVitrineComponent } from './site-vitrine/site-vitrine.component';
import { ApplicationWebComponent } from './application-web/application-web.component';
import { AutomatisationsComponent } from './automatisations/automatisations.component';
import { ConseilComponent } from './conseil/conseil.component';
import { TeamComponent } from './team/team.component';
import { RealisationsComponent } from './realisations/realisations.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DevSurMesureComponent,
    CallToActionComponent,
    SiteVitrineComponent,
    ApplicationWebComponent,
    TeamComponent,
    RealisationsComponent,
    AutomatisationsComponent,
    ConseilComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'innodev';
}
