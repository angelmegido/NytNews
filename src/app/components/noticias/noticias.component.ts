import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia.interface';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
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
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] | undefined;
  isCardView: boolean = false;
  viewMode: boolean = true;
  isLoading: boolean = false;
  displayedColumns: string[] = ['source', 'author', 'title', 'description'];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.noticiasService.getNoticias().subscribe(
      (noticia) => {
        this.noticias = noticia.results;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
      }
    );
  }

  getNoticiaImage(noticia: Noticia): string {
    if (noticia.media && noticia.media.length > 0) {
      let metadata = noticia.media[0]['media-metadata'];
      if (metadata && metadata.length > 0) {
        return metadata[0].url;
      }
    }
    return '';
  }

  changeViewMode(mode: boolean): void {
    this.viewMode = mode;
  }
  switchView(): void {
    this.isCardView = !this.isCardView;
  }
}
