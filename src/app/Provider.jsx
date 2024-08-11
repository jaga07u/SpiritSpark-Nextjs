import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
