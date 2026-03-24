import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import the RouterModule here
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarScrolled = false;
  userActive: any;

  
  selectedOption: string | undefined;
  private subscription: Subscription = new Subscription();
  activeUser: any;
  scrollPosition = 0;

  showLoginModal = false;

  constructor(
    private navbarService: NavbarService,
    private usersService: UsersService,
    private router: Router,
    public authService: AuthService
  ) {}

  private scrollHandler = this.onScroll.bind(this);

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler);
    this.subscription = this.navbarService.selectedOption$.subscribe(
      (option: any) => {
        this.selectedOption = option;
      }
    );
    this.usersService.getCurrentUser().subscribe((user: any) => {
      this.userActive = user?.user || '';
    });
    // Solo selecciona 'inicio' si no hay una opción guardada previamente
    setTimeout(() => {
      if (!this.selectedOption || this.selectedOption === '') {
        this.selectOption('inicio');
      }
    }, 0);
  }

  onScroll() {
    this.navbarScrolled = window.scrollY > 60;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  selectOption(option: string) {
    this.navbarService.setSelectedOption(option);
    this.toggleNavbar();
    if (option === 'inicio') {
      this.router.navigate(['/']);
      return;
    }

    // Delay scroll para iOS - espera a que el offcanvas se cierre
    setTimeout(() => {
      this.scrollTo(option);
    }, 300);
  }

  toggleNavbar() {
    this.navbarService.collapseNavbar();
  }

  logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigate(['login']);
  }

  logoutUser(): void {
    this.authService.logout();
  }

  openChatbox(): void {
    this.navbarService.toggleChatbox();
  }

  scrollTo(sectionId: string) {
    const navbarHeight = 70; // Altura del navbar sticky

    if (sectionId === 'inicio') {
      // Scroll al top directamente
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Busca el elemento en la página actual
    const el = document.getElementById(sectionId);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  }
}
