import { TInputSpecial } from '@psu/entities';
import { InputCheckbox } from '@psu/web-component-atoms';
import { Fieldset } from '@psu/web-component-templates';
import { FC, ReactElement } from 'react';

export const FieldCheckbox: FC<TInputSpecial & { label: string }> = (
  props
): ReactElement => {
  return (
    <Fieldset type={'checkbox'} {...props}>
      <InputCheckbox {...props} />
    </Fieldset>
  );
};
