import { TInputSpecial } from '@psu/entities';
import { InputCheckbox } from '@psu/web-component-atoms';
import { FC, ReactElement } from 'react';

export const FieldCheckbox: FC<TInputSpecial & { label: string }> = (
  props
): ReactElement => {
  return (
    <div className="inline-flex items-center">
      <InputCheckbox {...props} />
      <label
        id={props.id}
        className="mt-px font-light text-grey cursor-pointer select-none"
        htmlFor={props.name}
      >
        {props.label}
      </label>
    </div>
  );
};
