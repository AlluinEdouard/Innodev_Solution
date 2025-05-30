import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DevSurMesureComponent } from './dev-sur-mesure/dev-sur-mesure.component';
import { SiteVitrineComponent } from './site-vitrine/site-vitrine.component';
import { ApplicationWebComponent } from './application-web/application-web.component';
import { RealisationsComponent } from './realisations/realisations.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'dev-sur-mesure', component: DevSurMesureComponent },
    { path: 'site-vitrine', component: SiteVitrineComponent },
    { path: 'application-web', component: ApplicationWebComponent },
    { path: 'realisations', component: RealisationsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
