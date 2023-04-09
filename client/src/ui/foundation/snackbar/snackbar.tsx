import { Button } from '../button';

import * as styles from './snackbar.css';

import { useSnackbar } from '@/hooks';

export const Snackbars = () => {
  const { messagesQueue } = useSnackbar();

  return (
    <div className={styles.snackbars}>
      {messagesQueue.map(({ action, key, message }) => (
        <Snackbar key={key} message={message} action={action} />
      ))}
    </div>
  );
};

interface SnackbarProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Snackbar = ({ action, message }: SnackbarProps) => {
  return (
    <div className={styles.snackbar}>
      {message}
      {action && (
        <Button onClick={action.onClick} variant="secondary" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
};
