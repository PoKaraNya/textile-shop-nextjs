import { Cog, Globe, HomeIcon } from 'lucide-react';
// eslint-disable-next-line import/no-cycle
import { SidebarLinkType } from '@/components/SidebarItems';

type AdditionalLinks = {
  title: string;
  links: SidebarLinkType[]
};

export const defaultLinks: SidebarLinkType[] = [
  { href: '/dashboard', title: 'Home', icon: HomeIcon },
  { href: '/account', title: 'Account', icon: Cog },
  { href: '/settings', title: 'Settings', icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: 'Entities',
    links: [
      {
        href: '/orders',
        title: 'Orders',
        icon: Globe,
      },
    ],
  },

];
