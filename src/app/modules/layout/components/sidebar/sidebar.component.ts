import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { SidebarMenu2Component } from './sidebar-menu-2/sidebar-menu-2.component';
import { Menu2Service } from '../../services/menu2.service';
import { AuthService } from 'src/app/core/guards/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        AngularSvgIconModule,
        SidebarMenuComponent,
        RouterLink,
        SidebarMenu2Component
    ],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;

  constructor( public menuService: MenuService ,public menu2Service: Menu2Service, private authService: AuthService , private router: Router) {}

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  handleMenuAction(action: string): void {
    if (action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/sign-in']);
    }
    // Add more cases for other actions if needed
  }



}
