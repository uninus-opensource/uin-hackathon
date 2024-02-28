'use client';
import { FC, ReactElement, useEffect, useState } from 'react';
import { TSnackBarProps } from './type';
import clsx from 'clsx';
import { Button } from '../button';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { positionClasses, wrapperClasses } from './utils';
export const SnackBar: FC<TSnackBarProps> = ({
  type = 'info',
  message = '---',
  position = 'topRight',
  ...props
}): ReactElement => {
  const snackBarPropsStyle = clsx(
    wrapperClasses[type],
    'flex justify-between items-center overflow-hidden rounded-md shadow-lg my-3'
  );
  useEffect(() => {
    if (props.show) {
      const timeoutId = setTimeout(() => {
        props.onClose();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [props.show, props.onClose, props]);
  const positionProps = clsx(
    positionClasses[position],
    `fixed w-screen max-w-xs z-50 transition ease-out duration-300 ${
      props.show ? 'opacity-100' : 'opacity-0'
    } ${props.show ? 'translate-y-0' : 'translate-y-full'}`
  );
  return (
    <section className={positionProps}>
      <div className={snackBarPropsStyle}>
        <p className="text-sm font-semibold flex-grow p-3">{message}</p>
        <Button
          aria-label="Close"
          onClick={props.onClose}
          className="w-4 h-4 mx-3 items-center justify-center text-gray-400 dark:text-gray-200 hover:text-gray-900 rounded-md focus:ring-2 focus:ring-gray-300 inline-flex dark:hover:text-white"
        >
          <span className="sr-only">Close</span>
          <IoIosCloseCircleOutline />
        </Button>
      </div>
    </section>
  );
};
