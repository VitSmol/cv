import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      { path: '', component: MainPageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'education', component: EducationComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'portfolio', component: PortfolioComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
