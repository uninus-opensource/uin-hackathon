import { RequiredSnackBarProps, TSnackBarPosition } from './type';

export const wrapperClasses: Record<RequiredSnackBarProps['type'], string> = {
  info: 'bg-info-100 dark:bg-info-800 dark:text-info-100',
  success: 'bg-primary-100 dark:bg-primary-500 dark:text-primary-100',
  warning: 'bg-warning-100 dark:bg-warning-800 dark:text-warning-100',
  error: 'bg-error-100 dark:bg-error-700 dark:text-error-100',
};
export const positionClasses: Record<TSnackBarPosition, string> = {
  topRight: 'top-0 right-1',
  topCenter: 'top-0 right-1/2 translate-x-1/2',
  topLeft: 'top-0 left-1',
  bottomLeft: 'bottom-0 left-1',
  bottomCenter: 'bottom-0 right-1/2 translate-x-1/2',
  bottomRight: 'bottom-0 right-1',
};
