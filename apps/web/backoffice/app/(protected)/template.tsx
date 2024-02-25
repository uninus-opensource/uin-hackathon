import { FC, PropsWithChildren, ReactElement } from 'react';

const ProtectedTemplate: FC<Readonly<PropsWithChildren>> = ({
  children,
}): ReactElement => {
  return (
    <main className="w-full flex min-h-screen h-full bg-grey-50">
      <aside className="w-1/4 min-h-screen h-full bg-primary"></aside>
      <section className="flex flex-col w-full">
        <nav className="bg-white shadow-md p-6"></nav>
        <div className="flex px-8 py-6">{children}</div>
      </section>
    </main>
  );
};

export default ProtectedTemplate;
