import { FC, ReactElement } from 'react';
import { clsx } from 'clsx';
import { TLabel } from '@psu/entities';

export const Label: FC<TLabel> = (props): ReactElement => {
  const className = clsx(
    'flex gap-x-1 text-grey-400 select-none font-medium',
    {
      'text-sm': props.size === 'sm',
      'text-base': props.size === 'md',
      'text-lg': props.size === 'lg',
    },
    {
      'text-grey-300 cursor-not-allowed opacity-50': props.disabled,
    },
    props.className
  );

  return (
    <label data-testid="label" className={className} {...props}>
      {props.children}
      {props.required && (
        <span data-testid="required" className="text-error">
          *
        </span>
      )}
    </label>
  );
};
