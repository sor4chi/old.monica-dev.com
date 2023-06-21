'use client';
import { useEffect, useState } from 'react';

import Timeline from '..';
import type { AboutTimelineFragmentResponse } from '../query';

import { TimelineEditor } from './editor';
import type {
  CreateTimelineMutationResponse,
  CreateTimelineMutationVariables,
  DeleteTimelineMutationResponse,
  TimelineAdminQueryResponse,
  UpdateTimelineMutationResponse,
  UpdateTimelineMutationVariables,
} from './query';
import { CreateTimelineQuery, DeleteTimelineQuery, TimelineAdminQuery, UpdateTimelineQuery } from './query';
import { SetTimelineEditorProvider, useTimelineEditorCtx } from './use-timeline-editor';

import { clientInBrowser } from '@/lib/graphql';
import { getSafelyDate } from '@/util/date';

export const TimelineAdmin = () => {
  const TimelineEditorValue = useTimelineEditorCtx();
  const [timelines, setTimelines] = useState<AboutTimelineFragmentResponse>([]);
  const [blogs, setBlogs] = useState<
    {
      id: number;
      title: string;
    }[]
  >([]);
  const [editingTimelineId, setEditingTimelineId] = useState<number | null>(null);

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

  const appendTimeline = async (timeline: {
    category: string;
    date: Date;
    title: string;
    relatedBlogId?: number | undefined;
  }) => {
    try {
      const data = await clientInBrowser.request<CreateTimelineMutationResponse, CreateTimelineMutationVariables>(
        CreateTimelineQuery,
        {
          input: {
            category: timeline.category,
            date: new Date(timeline.date).toISOString().slice(0, 10),
            relatedBlogId: timeline.relatedBlogId || null,
            title: timeline.title,
          },
        },
      );

      setTimelines([...timelines, data.timeline]);
    } catch (e) {
      console.error(e);
    }
  };

  const editTimeline = async (
    id: number,
    timeline: {
      category: string;
      date: Date;
      title: string;
      relatedBlogId?: number | undefined;
    },
  ) => {
    try {
      const data = await clientInBrowser.request<UpdateTimelineMutationResponse, UpdateTimelineMutationVariables>(
        UpdateTimelineQuery,
        {
          id,
          input: {
            category: timeline.category,
            date: new Date(timeline.date).toISOString().slice(0, 10),
            relatedBlogId: timeline.relatedBlogId || null,
            title: timeline.title,
          },
        },
      );
      const newTimelines = timelines.map((t) => {
        if (t.id === data.timeline.id) {
          return data.timeline;
        }
        return t;
      });
      setTimelines(newTimelines);
    } catch (e) {
      console.error(e);
    }

    setEditingTimelineId(null);
  };

  const deleteTimeline = async (id: number) => {
    try {
      await clientInBrowser.request<DeleteTimelineMutationResponse>(DeleteTimelineQuery, {
        id,
      });
      const newTimelines = timelines.filter((t) => t.id !== id);
      setTimelines(newTimelines);
    } catch (e) {
      console.error(e);
    }
  };

  const onTimelineClick = async (id: number, mode: 'edit' | 'delete') => {
    if (mode === 'edit') {
      setEditingTimelineId(id);
      const timeline = timelines.find((t) => t.id === id);
      if (timeline) {
        TimelineEditorValue.form.reset({
          ...timeline,
          date: getSafelyDate(timeline.date),
          relatedBlogId: timeline.blog?.id,
        });
        TimelineEditorValue.setIsTimelineEditorOpen(true);
      }
    } else if (mode === 'delete') {
      const timeline = timelines.find((t) => t.id === id);
      if (timeline) {
        const confirm = window.confirm(`Are you sure to delete ${timeline.title}?`);
        if (confirm) {
          await deleteTimeline(id);
        }
      }
    }
  };

  const handleSubmitTimeline = async (timeline: {
    category: string;
    date: Date;
    title: string;
    relatedBlogId?: number;
  }) => {
    if (editingTimelineId !== null) {
      await editTimeline(editingTimelineId, timeline);
      return;
    }
    await appendTimeline(timeline);
  };

  const onClose = () => {
    setEditingTimelineId(null);
  };

  return (
    <SetTimelineEditorProvider value={TimelineEditorValue}>
      <Timeline timelines={timelines} onClick={onTimelineClick} />
      <TimelineEditor
        blogs={blogs}
        submitTimeline={handleSubmitTimeline}
        mode={editingTimelineId ? 'edit' : 'create'}
        onClose={onClose}
      />
    </SetTimelineEditorProvider>
  );
};
