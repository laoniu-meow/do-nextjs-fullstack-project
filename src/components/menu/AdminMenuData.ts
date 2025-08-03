import { MenuItemProps } from './MenuItem';

export const adminMenuItems: MenuItemProps[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/admin',
  },
  {
    id: 'company',
    label: 'Company',
    icon: '🏢',
    href: '/admin/company',
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    href: '/admin/users',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    href: '/admin/settings',
  },
];

export const userMenuItems: MenuItemProps[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    href: '/user/profile'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: '📦',
    href: '/user/orders'
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: '❤️',
    href: '/user/favorites'
  }
];

export const frontendMenuItems: MenuItemProps[] = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    href: '/'
  },
  {
    id: 'about',
    label: 'About',
    icon: 'ℹ️',
    href: '/about'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '📞',
    href: '/contact'
  }
]; 