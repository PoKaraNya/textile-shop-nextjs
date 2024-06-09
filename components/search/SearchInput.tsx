'use client';

import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchInput() {
  return (
    <div className="relative flex w-full max-w-md items-center lg:max-w-none">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-app-secondary" />
      <Input
        className="h-10 w-full rounded-md border border-t-bg-light bg-bg-light pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
        placeholder="Search products..."
        type="search"
      />
    </div>
  );
}
