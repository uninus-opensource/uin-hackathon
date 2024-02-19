import { FC, PropsWithChildren, ReactElement } from 'react';

const AuthTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <section className="flex items-center justify-center">
      {props.children}
    </section>
  );
};

export default AuthTemplate;
