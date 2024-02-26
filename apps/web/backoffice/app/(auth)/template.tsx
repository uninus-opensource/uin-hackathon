import { FC, PropsWithChildren, ReactElement } from 'react';

const AuthTemplate: FC<Readonly<PropsWithChildren>> = (props): ReactElement => {
  return (
    <main className="flex overflow-hidden items-center xl:min-w-[1280px] w-full md:px-[40px] lg:px-[80px]">
      <section className="flex z-10 relative flex-col backdrop-blur-lg max-h-screen h-auto bg-white w-full items-center justify-center">
        <div className="z-10 w-full overflow-y-hidden h-full">
          {props.children}
        </div>
        <div className="hidden lg:block absolute z-0 blur-3xl w-[400px] h-[373px] rounded-full bg-primary bottom-[-180px] left-[-120px]" />
        <div className="hidden lg:block absolute z-0 blur-3xl w-[400px] h-[373px] rounded-full bg-info bottom-[-260px] left-[200px]" />
      </section>
    </main>
  );
};

export default AuthTemplate;
