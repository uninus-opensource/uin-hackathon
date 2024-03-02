import { FC, PropsWithChildren, ReactElement } from 'react';

const AuthNestedTemplate: FC<PropsWithChildren> = (props): ReactElement => {
  return (
    <section className="flex overflow-y-hidden lg:flex-row flex-col justify-center items-center w-full h-full min-h-screen">
      <div className="md:w-1/2 w-full h-full px-6 md:px-0">
        {props.children}
      </div>
    </section>
  );
};
export default AuthNestedTemplate;
