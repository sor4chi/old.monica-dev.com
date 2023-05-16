'use client';
import { useEffect, useState } from 'react';

import { Timeline } from '..';
import type { AboutTimelineFragmentResponse } from '../query';
import { AboutTimelineFragment } from '../query';

import { TimelineEditor } from './editor';
import { TimelineEditorProvider } from './use-timeline-editor';

import { clientInBrowser, gql } from '@/lib/graphql';

const TimelineAdminQuery = gql`
  ${AboutTimelineFragment}

  query TimelineAdminQuery() {
    timelines {
      ...AboutTimelineFragment
    }
    blogs: blogsAll(input: { limit: 999, offset: 0, tags: [] }) {
      data {
        id
        title
      }
    }
  }
`;

type TimelineAdminQueryResponse = {
  timelines: AboutTimelineFragmentResponse;
  blogs: {
    data: {
      id: number;
      title: string;
    }[];
  };
};

export const TimelineAdmin = () => {
  const [timelines, setTimelines] = useState<AboutTimelineFragmentResponse>([]);
  const [blogs, setBlogs] = useState<
    {
      id: number;
      title: string;
    }[]
  >([]);

  const getData = async () => {
    try {
      const data = await clientInBrowser.request<TimelineAdminQueryResponse>(TimelineAdminQuery);

      setTimelines(data.timelines);
      setBlogs(data.blogs.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const appendTimeline = (timeline: AboutTimelineFragmentResponse[number]) => {
    setTimelines([...timelines, timeline]);
  };

  return (
    <TimelineEditorProvider>
      <Timeline timelines={timelines} onClick={(id, mode) => console.log(id, mode)} />
      <TimelineEditor blogs={blogs} appendTimeline={appendTimeline} />
    </TimelineEditorProvider>
  );
};
