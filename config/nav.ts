import { Cog, Globe, HomeIcon } from 'lucide-react';
// eslint-disable-next-line import/no-cycle
import { SidebarLinkType } from '@/components/SidebarItems';

type AdditionalLinks = {
  title: string;
  links: SidebarLinkType[]
};

export const defaultLinks: SidebarLinkType[] = [
  { href: '/admin/dashboard', title: 'Home', icon: HomeIcon },
  { href: '/admin/account', title: 'Account', icon: Cog },
  { href: '/admin/settings', title: 'Settings', icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: 'Entities',
    links: [
      {
        href: '/admin/orders',
        title: 'Orders',
        icon: Globe,
      },
      {
        href: '/admin/products',
        title: 'Products',
        icon: Globe,
      },
      {
        href: '/admin/categories',
        title: 'Categories',
        icon: Globe,
      },
      {
        href: '/admin/feedbacks',
        title: 'Feedbacks',
        icon: Globe,
      },
    ],
  },
];
