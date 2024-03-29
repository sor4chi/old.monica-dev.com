'use client';

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import * as styles from './editor.css';
import type { TimelineFormSchema } from './use-timeline-editor';
import { TIMELINE_FORM_ID, useTimelineEditor } from './use-timeline-editor';

import { TIMELINE_CATEGORIES } from '@/constant/timeline';
import { useDashboardHeader } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { Calendar } from '@/ui/foundation/calendar';
import { Modal, ModalPortal } from '@/ui/foundation/modal';
import { Selectbox } from '@/ui/foundation/selectbox';
import { TextInput } from '@/ui/foundation/textInput';
import { Plus } from '@/ui/icons';

interface Props {
  blogs: {
    id: number;
    title: string;
  }[];
  submitTimeline: (timeline: { category: string; date: Date; title: string; relatedBlogId?: number }) => Promise<void>;
  mode: 'edit' | 'create';
  onClose: () => void;
}

export const TimelineEditor = ({ blogs, mode, onClose, submitTimeline }: Props) => {
  const { form, isTimelineEditorOpen, setIsTimelineEditorOpen } = useTimelineEditor();
  const { setDashboardHeaderContent } = useDashboardHeader();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = form;

  useEffect(() => {
    setDashboardHeaderContent(
      <Button icon={<Plus className={styles.addIcon} />} onClick={() => setIsTimelineEditorOpen(true)}>
        Add
      </Button>,
    );
  }, []);

  const cancel = () => {
    reset({
      category: '',
      date: new Date(),
      relatedBlogId: undefined,
      title: '',
    });
    setIsTimelineEditorOpen(false);
    onClose();
  };

  const onSubmit = async (data: TimelineFormSchema) => {
    await submitTimeline(data);
    cancel();
  };

  return (
    <ModalPortal>
      <Modal
        isOpen={isTimelineEditorOpen}
        onClose={cancel}
        title={mode === 'edit' ? 'Edit Timeline' : 'Create Timeline'}
        footer={
          <>
            <Button variant="tertiary" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" form={TIMELINE_FORM_ID}>
              Create
            </Button>
          </>
        }
      >
        <form id={TIMELINE_FORM_ID} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formLeft}>
            <TextInput
              id="title"
              label="Title"
              placeholder="Enter Title"
              {...register('title', { required: true })}
              error={errors.title?.message}
            />
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Selectbox
                  id="category"
                  label="Category"
                  options={[
                    ...Object.entries(TIMELINE_CATEGORIES).map(([key, { emoji }]) => ({
                      label: `${emoji} ${key}`,
                      value: key,
                    })),
                    {
                      label: 'Other',
                      value: 'other',
                    },
                  ]}
                  placeholder="Select Category"
                  onChange={onChange}
                  value={form.watch('category')}
                  mode="input"
                  error={errors.category?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="relatedBlogId"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Selectbox
                  id="related-blog"
                  label="Related Blog"
                  options={blogs.map((blog) => ({
                    label: blog.title,
                    value: blog.id.toString(),
                  }))}
                  placeholder="Connect Blog"
                  onChange={onChange}
                  value={`${form.watch('relatedBlogId')}`}
                  error={errors.relatedBlogId?.message}
                />
              )}
            />
          </div>
          <div className={styles.formRight}>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <Calendar
                  setSelectedDate={(date) => onChange(date)}
                  selectedDate={value}
                  label="Date"
                  error={errors.date?.message}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </ModalPortal>
  );
};
