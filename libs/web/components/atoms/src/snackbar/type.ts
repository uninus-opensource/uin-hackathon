export type TSnackBarProps = {
  id?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  message?: string;
  duration?: number;
  position?: TSnackBarPosition;

  onClose: () => void;
  show?: boolean;
};

export type TSnackBarPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomRight'
  | 'bottomCenter'
  | 'bottomLeft';

export type RequiredSnackBarProps = Required<TSnackBarProps>;
