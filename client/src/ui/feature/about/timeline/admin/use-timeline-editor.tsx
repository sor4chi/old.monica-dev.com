import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { clientInBrowser, gql } from '@/lib/graphql';
import { createCtx } from '@/util/context';

const schema = z.object({
  category: z
    .string({
      required_error: 'カテゴリーを入力してください',
    })
    .min(1, { message: 'カテゴリーを入力してください' }),
  date: z.date().min(new Date(2000, 1, 1), { message: '2000年以降の日付を入力してください' }),
  relatedBlogId: z.optional(z.preprocess((val) => Number(val), z.number())),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

export type TimelineFormSchema = z.infer<typeof schema>;

const CreateTimelineQuery = gql`
  mutation CreateTimelineQuery($input: TimelineInput!) {
    timeline: createTimeline(input: $input) {
      id
      title
      category
      date
      blog {
        title
        slug
      }
    }
  }
`;

type CreateTimelineMutationResponse = {
  timeline: {
    id: number;
    title: string;
    category: string;
    date: string;
    blog: {
      title: string;
      slug: string;
    } | null;
  };
};

type CreateTimelineMutationVariables = {
  input: {
    title: string;
    relatedBlogId: number | null;
    category: string;
    date: string;
  };
};

type ITimelineEditorContext = {
  form: UseFormReturn<TimelineFormSchema>;
  isTimelineEditorOpen: boolean;
  setIsTimelineEditorOpen: (value: boolean) => void;
  postTimeline: (data: TimelineFormSchema) => Promise<CreateTimelineMutationResponse['timeline']>;
};

const [useTimelineEditor, SetTimelineEditorProvider] = createCtx<ITimelineEditorContext>();

export { useTimelineEditor };

export const TIMELINE_FORM_ID = 'timelineForm';

const useTimelineEditorCtx = (): ITimelineEditorContext => {
  const form = useForm<TimelineFormSchema>({
    resolver: zodResolver(schema),
  });

  const postTimeline = async (data: TimelineFormSchema) => {
    const { timeline } = await clientInBrowser
      .request<CreateTimelineMutationResponse, CreateTimelineMutationVariables>(CreateTimelineQuery, {
        input: {
          category: data.category,
          date: new Date(data.date).toISOString().slice(0, 10),
          relatedBlogId: data.relatedBlogId || null,
          title: data.title,
        },
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    return timeline;
  };

  const [isTimelineEditorOpen, setIsTimelineEditorOpen] = useState(false);

  return {
    form,
    isTimelineEditorOpen,
    postTimeline,
    setIsTimelineEditorOpen,
  };
};

interface Props {
  children: ReactNode;
}

export const TimelineEditorProvider = ({ children }: Props) => {
  const TimelineEditor = useTimelineEditorCtx();
  return <SetTimelineEditorProvider value={TimelineEditor}>{children}</SetTimelineEditorProvider>;
};
