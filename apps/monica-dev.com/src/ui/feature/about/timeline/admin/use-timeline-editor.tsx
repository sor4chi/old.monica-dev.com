import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

type ITimelineEditorContext = {
  form: UseFormReturn<TimelineFormSchema>;
  isTimelineEditorOpen: boolean;
  setIsTimelineEditorOpen: (value: boolean) => void;
};

export const [useTimelineEditor, SetTimelineEditorProvider] = createCtx<ITimelineEditorContext>();

export const TIMELINE_FORM_ID = 'timelineForm';

export const useTimelineEditorCtx = (): ITimelineEditorContext => {
  const form = useForm<TimelineFormSchema>({
    resolver: zodResolver(schema),
  });

  const [isTimelineEditorOpen, setIsTimelineEditorOpen] = useState(false);

  return {
    form,
    isTimelineEditorOpen,
    setIsTimelineEditorOpen,
  };
};
