'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import type { AboutContentFragmentResponse } from './query';

import { Tab, TabContent } from '@/ui/foundation/tab';

interface Props {
  timelines: AboutContentFragmentResponse;
}

const Profile = dynamic(() => import('../profile'));
const Timeline = dynamic(() => import('../timeline'));

export const AboutContent = ({ timelines }: Props) => {
  const TABS = [
    {
      content: <Profile />,
      id: 'profile',
      label: 'Profile',
    },
    {
      content: <Timeline timelines={timelines} />,
      id: 'timeline',
      label: 'Timeline',
    },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <>
      <Tab name="about" tabs={TABS} onChange={setActiveTab} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} tabs={TABS} setActiveTab={setActiveTab} />
    </>
  );
};
