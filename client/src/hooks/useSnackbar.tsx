import type { ReactNode } from 'react';
import { useState } from 'react';

import { createCtx } from '@/util/context';

type SnackOption = {
  action: {
    label: string;
    onClick: () => void;
  };
  duration: number;
};

type ISnackbarContext = {
  snack: (message: string, option?: Partial<SnackOption>) => void;
  messagesQueue: {
    message: string;
    key: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  }[];
};

const [useSnackbar, SetSnackbarProvider] = createCtx<ISnackbarContext>();

export { useSnackbar };

const useSnackbarCtx = (): ISnackbarContext => {
  const [messagesQueue, setMessagesQueue] = useState<
    {
      message: string;
      key: string;
      action?: {
        label: string;
        onClick: () => void;
      };
    }[]
  >([]);

  const snack = (message: string, option?: Partial<SnackOption>) => {
    const action = option?.action;
    const duration = option?.duration || 3000;
    const hash = Math.random().toString(36).substring(7);
    setMessagesQueue((prev) => [...prev, { action, key: hash, message }]);
    setTimeout(() => {
      setMessagesQueue((prev) => prev.filter((m) => m.key !== hash));
    }, duration);
  };

  return {
    messagesQueue,
    snack,
  };
};

interface Props {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: Props) => {
  const Snackbar = useSnackbarCtx();
  return <SetSnackbarProvider value={Snackbar}>{children}</SetSnackbarProvider>;
};
