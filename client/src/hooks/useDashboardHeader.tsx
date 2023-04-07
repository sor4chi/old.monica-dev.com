import type { ReactNode } from 'react';
import { useState } from 'react';

import { createCtx } from '@/util/context';

type IDashboardHeaderContext = {
  dashboardHeaderContent: ReactNode;
  setDashboardHeaderContent: (content: ReactNode) => void;
};

const [useDashboardHeader, SetDashboardHeaderProvider] = createCtx<IDashboardHeaderContext>();

export { useDashboardHeader };

const useDashboardHeaderCtx = (): IDashboardHeaderContext => {
  const [dashboardHeaderContent, setDashboardHeaderContent] = useState<ReactNode>(null);

  return {
    dashboardHeaderContent,
    setDashboardHeaderContent,
  };
};

interface Props {
  children: ReactNode;
}

export const DashboardHeaderProvider = ({ children }: Props) => {
  const DashboardHeader = useDashboardHeaderCtx();
  return <SetDashboardHeaderProvider value={DashboardHeader}>{children}</SetDashboardHeaderProvider>;
};
