import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoticiaComponent } from './components/noticia/noticia.component';
import { NoticiasComponent } from './components/noticias/noticias.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: NoticiaComponent },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: '**', component: NoticiasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
