import { TSize, TState, TVariant, TVariantType } from '@psu/entities';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Omit<TVariant, 'default' | 'info'>;
  size?: TSize;
  variantType?: TVariantType;
  href?: string;
  state?: TState;
};
