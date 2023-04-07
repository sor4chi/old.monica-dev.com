import type { ReactNode } from 'react';
import { useState } from 'react';

import { createCtx } from '@/util/context';

type IDashboardHeaderContext = {
  dashboardHeaderContent: ReactNode;
  title?: string;
  setDashboardHeaderContent: (content: ReactNode) => void;
  setTitle: (title: string) => void;
};

const [useDashboardHeader, SetDashboardHeaderProvider] = createCtx<IDashboardHeaderContext>();

export { useDashboardHeader };

const useDashboardHeaderCtx = (): IDashboardHeaderContext => {
  const [dashboardHeaderContent, setDashboardHeaderContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  return {
    dashboardHeaderContent,
    setDashboardHeaderContent,
    setTitle,
    title,
  };
};

interface Props {
  children: ReactNode;
}

export const DashboardHeaderProvider = ({ children }: Props) => {
  const DashboardHeader = useDashboardHeaderCtx();
  return <SetDashboardHeaderProvider value={DashboardHeader}>{children}</SetDashboardHeaderProvider>;
};
