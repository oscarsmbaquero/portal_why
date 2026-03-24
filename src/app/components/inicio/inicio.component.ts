import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit, OnDestroy {

  private sub: Subscription | undefined;
  cargando = false;

cards: any[] = [
  {
    label: 'Contabilidad',
    sub: 'Gestión contable',
    url: 'https://contabilidad.tudominio.com',
    img: '/assets/images/contabilidad.png',
  },
  {
    label: 'Why? music everywhere',
    url: 'https://angular-e-commerce-8gfanu9o4-oscarsmbaqueros-projects.vercel.app/',
    sub: 'Ecommerce ',
    img: '/assets/images/why_music.png',
  },
  {
    label: 'Inteligencia Artificial',
    sub: 'web de consultora IA',
    url: 'https://portfolio-sigma-six-0fwnv90i33.vercel.app/',
    img: '/assets/images/web_ia.png',
  },
  {
    label: 'Automatizaciones',
    sub: 'Demo de flujos automáticos',
    url: 'https://why-is-demo.vercel.app/',
    img: '/assets/images/why_demo.png',
  },
  {
    label: 'Fichajes',
    sub: 'Control de presencia',
    url: 'https://why-fichajes.vercel.app/',
    img: '/assets/images/why_fichajes.png',
  },
];

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  navigate(url: string) {
    window.open(url, '_blank');
  }

  copyUrl(event: Event, url: string) {
  event.stopPropagation(); // evita que se navegue al hacer click
  navigator.clipboard.writeText(url).then(() => {
    // opcional: feedback visual
  });
}

}