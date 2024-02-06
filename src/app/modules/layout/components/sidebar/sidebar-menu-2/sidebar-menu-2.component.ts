import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { Menu2Service } from '../../../services/menu2.service';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from 'src/app/core/guards/auth.service';

@Component({
    selector: 'app-sidebar-menu-2',
    templateUrl: './sidebar-menu-2.component.html',
    styleUrls: ['./sidebar-menu-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        AngularSvgIconModule,
        NgTemplateOutlet,
        RouterLink,
        RouterLinkActive,
        NgIf,
        SidebarSubmenuComponent,
    ],
})
export class SidebarMenu2Component implements OnInit {
  constructor(
    public menu2Service: Menu2Service,
    public themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  public toggleMenu(subMenu: SubMenuItem) {
    this.menu2Service.toggleMenu(subMenu);
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }

  logout(): void {
    // Call the logout function from AuthService
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
    // Additional logic if needed after logout
    console.log('User logged out'); // Add a console log statement
  }

  ngOnInit(): void {}
}
