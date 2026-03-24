import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from '../core/services/navbarService/navbar.service';
import { AuthService } from '../core/services/authService/auth.service';
//COMPONENTS
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from '../core/services/users/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    TranslateModule,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TranslateModule],
})
export class AppComponent {

  title = 'Portal Aplicaciones Why';
  scrollPosition = 0;
  userActive = '';

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private cookieService: CookieService,
    public authService: AuthService,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    
     this.usersService.getCurrentUser().subscribe((user) => {
      this.userActive = user?.user || '';
    });
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
     this.navbarService.setSelectedOption('inicio');
  }
}
