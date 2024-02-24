import { FC, useId } from 'react';
import { TInputSpecial } from '@psu/entities';

export const InputRadio: FC<TInputSpecial> = ({
  size = 'sm',
  status = 'primary',
  ...props
}) => {
  const id = useId();
  return <input {...props} id={id} type={'radio'} />;
};
