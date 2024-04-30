'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string }
}

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="uk">
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
}
