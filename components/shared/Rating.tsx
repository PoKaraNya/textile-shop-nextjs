'use client';

import { StarIcon } from 'lucide-react';
import { range } from 'lodash';
import classNames from 'classnames';

interface Props {
  value: number
  clickHandler?: (value: number) => void
}

export function Rating({ value, clickHandler }: Props) {
  const ratingRange = range(1, 6);
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0.5">
          {ratingRange.map((rangeValue) => (
            <StarIcon
              className={classNames(
                'w-5 h-5 fill-primary',
                { 'fill-muted': rangeValue < value },
              )}
              onClick={() => clickHandler && clickHandler(rangeValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
