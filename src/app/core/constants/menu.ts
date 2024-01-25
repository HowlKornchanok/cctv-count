import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '',
          children: [
            { label: 'Main', route: '/dashboard/main' },
            { label: 'Analytics', route: '/dashboard/analytics' },
            { label: 'History', route: '/dashboard/history' },
          ],
        },
      ],
    },
    
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        }
      ],
    },
  ];
}
