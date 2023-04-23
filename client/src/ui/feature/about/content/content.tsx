'use client';
import { useState } from 'react';

import { Profile } from '../profile';
import { Timeline } from '../timeline';

import { Tab, TabContent } from '@/ui/foundation/tab';

const TABS = [
  {
    content: <Profile />,
    id: 'profile',
    label: 'Profile',
  },
  {
    content: <Timeline />,
    id: 'timeline',
    label: 'Timeline',
  },
];

export const AboutContent = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <Tab name="about" tabs={TABS} onChange={setActiveTab} />
      <TabContent activeTab={activeTab} tabs={TABS} />
    </>
  );
};
