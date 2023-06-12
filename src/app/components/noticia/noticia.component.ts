import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia, ResultadoAPI } from 'src/app/models/noticia.interface';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NoticiaComponent implements OnInit {
  noticia: Noticia | undefined;
  showDetails: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noticiasService.getNoticias().subscribe((response: ResultadoAPI) => {
        if (response.num_results > 0) {
          this.noticia = response.results.find(
            (article: Noticia) => article.id === +id
          );
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  onSelectNoticia(noticia: Noticia) {
    this.noticiasService.selectedNoticia = noticia;
    this.router.navigate(['/noticia', noticia.id]);
  }
}
