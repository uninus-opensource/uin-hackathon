'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SessionProvider } from 'next-auth/react';

export const WebAuthProvider: FC<PropsWithChildren> = (props): ReactElement => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
