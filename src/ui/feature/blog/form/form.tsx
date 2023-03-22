import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAdd, MdClose } from 'react-icons/md';
import { z } from 'zod';

import * as styles from './form.css';

import { useDashboardHeader } from '@/hooks';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { Article } from '@/ui/foundation/article';
import { Button } from '@/ui/foundation/button';
import { IconButton } from '@/ui/foundation/icon-button';
import { TextInput } from '@/ui/foundation/textInput';
import { Textarea } from '@/ui/foundation/textarea';
import { Toggle } from '@/ui/foundation/toggle';

const scheme = z.object({
  content: z.string().min(1, { message: '本文を入力してください' }),
  description: z.string().min(1, { message: '説明を入力してください' }),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
  tags: z.array(
    z.object({
      name: z.string().min(1, { message: 'タグを入力してください' }),
      slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'スラッグは半角英数字とハイフンのみで入力してください' }),
    }),
  ),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

type Scheme = z.infer<typeof scheme>;

const BLOG_FORM_ID = 'blogForm';

const postBlog = async (params: Scheme) => {
  console.log(params);
};

interface Props {
  blog: {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: {
      slug: string;
      name: string;
    }[];
    publishedAt: Date | null;
  };
  tagOptions: {
    slug: string;
    name: string;
  }[];
}

const removeBlogFromLocalStorageById = (id: number) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id !== id);
    localStorage.setItem('blogForm', JSON.stringify(filtered));
  }
};

const updateBlogFromLocalStorageById = (id: number, data: Scheme) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id !== id);
    const updated = [...filtered, { id, ...data }];
    localStorage.setItem('blogForm', JSON.stringify(updated));
  } else {
    localStorage.setItem('blogForm', JSON.stringify([{ id, ...data }]));
  }
};

const getBlogFromLocalStorageById = (id: number) => {
  const blogForm = localStorage.getItem('blogForm');
  if (blogForm) {
    const parsed = JSON.parse(blogForm);
    const filtered = parsed.filter((blog: { id: number }) => blog.id === id);
    return filtered[0];
  }
};

export const BlogForm = ({ blog, tagOptions }: Props) => {
  const {
    formState: { errors },
    getValues,
    register,
    setValue,
    watch,
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });
  const formData = watch();
  const [contentEditorOptions, setContentEditorOptions] = useState({
    fullscreen: false,
    preview: false,
  });
  const [showTagInput, setShowTagInput] = useState(false);
  const [searchTagInput, setSearchTagInput] = useState('');
  const [isPublished, setIsPublished] = useState(blog.publishedAt !== null);
  const [addTagInput, setAddTagInput] = useState({
    name: '',
    slug: '',
  });
  const { setDashboardHeaderContent } = useDashboardHeader();

  const onSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = getValues();
    postBlog(data);
    removeBlogFromLocalStorageById(blog.id);
  };

  const handleChange = () => {
    updateBlogFromLocalStorageById(blog.id, formData);
  };

  const handleAddTag = () => {
    const tags = getValues('tags');
    const newTag = {
      name: addTagInput.name,
      slug: addTagInput.slug,
    };
    const newTags = [...tags, newTag];
    setValue('tags', newTags);
    updateBlogFromLocalStorageById(blog.id, { ...formData, tags: newTags });
    setAddTagInput({
      name: '',
      slug: '',
    });
    setShowTagInput(false);
  };

  const handleSelectTag = (tag: { name: string; slug: string }) => {
    const newTags = [...getValues('tags'), tag];
    setValue('tags', newTags);
    updateBlogFromLocalStorageById(blog.id, { ...formData, tags: newTags });
  };

  const handleRemoveTag = (tag: { name: string; slug: string }) => {
    const newTags = getValues('tags').filter((t: { name: string; slug: string }) => t.slug !== tag.slug);
    setValue('tags', newTags);
    updateBlogFromLocalStorageById(blog.id, { ...formData, tags: newTags });
  };

  useEffect(() => {
    const data = getBlogFromLocalStorageById(blog.id);
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('content', data.content);
      setValue('tags', data.tags);
      setValue('slug', data.slug);
    } else {
      setValue('title', blog.title);
      setValue('description', blog.description);
      setValue('content', blog.content);
      setValue('tags', blog.tags);
      setValue('slug', blog.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDashboardHeaderContent(
      <>
        <Toggle
          label="公開する"
          id="toggle-publish"
          onChange={() => setIsPublished(!isPublished)}
          checked={isPublished}
        />
        <Button type="submit" form={BLOG_FORM_ID} onClick={onSubmitButtonClick}>
          Save
        </Button>
      </>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublished]);

  const filteredTags = useMemo(() => {
    if (Object.values(searchTagInput).some((v) => v === '')) {
      return [];
    }
    return tagOptions
      .filter((tag) => tag.name.toLowerCase().includes(searchTagInput.toLowerCase()))
      .filter((tag) => {
        const tags = formData.tags || [];
        return !tags.some((t) => t.slug === tag.slug);
      });
  }, [searchTagInput, tagOptions, formData.tags]);

  return (
    <form className={styles.form} onChange={handleChange} id={BLOG_FORM_ID}>
      <section className={styles.metaArea}>
        <TextInput
          label="Title"
          id="title"
          placeholder="ブログのタイトル"
          {...register('title')}
          error={errors.title?.message}
        />
        <TextInput
          label="Description"
          id="description"
          placeholder="ブログの説明・要約"
          {...register('description')}
          error={errors.description?.message}
        />
        <TextInput
          label="Slug"
          id="slug"
          placeholder="ブログのURLスラッグ"
          {...register('slug')}
          error={errors.slug?.message}
        />
        <div className={styles.tagEditor}>
          <div>
            <div className={styles.contentHeader}>
              <label className={styles.tagEditorLabel}>Tags</label>
              <Toggle
                id="toggle-show-tag-input"
                label="タグを追加"
                checked={showTagInput}
                onChange={() => setShowTagInput(!showTagInput)}
              />
            </div>
            <div>
              <div className={styles.tagList}>
                {(getValues('tags') || []).map((tag) => (
                  <IconButton key={tag.slug} icon={<MdClose />} onClick={() => handleRemoveTag(tag)}>
                    {tag.name}
                  </IconButton>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.tagSetting}>
            {showTagInput ? (
              <>
                <div className={styles.tagInputs}>
                  <TextInput
                    label="Slug"
                    id="slug"
                    placeholder="スラッグ（半角英数字とハイフンのみ）"
                    value={addTagInput.slug}
                    onChange={(e) => setAddTagInput({ ...addTagInput, slug: e.target.value })}
                  />
                  <TextInput
                    label="Name"
                    id="name"
                    placeholder="名前"
                    value={addTagInput.name}
                    onChange={(e) => setAddTagInput({ ...addTagInput, name: e.target.value })}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    追加
                  </Button>
                </div>
              </>
            ) : (
              <>
                <TextInput
                  label="Search Tag"
                  id="search-tag"
                  placeholder="タグを検索・追加"
                  value={searchTagInput}
                  onChange={(e) => setSearchTagInput(e.target.value)}
                />
                <div className={styles.tagList}>
                  {filteredTags.map((tag) => (
                    <IconButton key={tag.slug} icon={<MdAdd />} onClick={() => handleSelectTag(tag)}>
                      {tag.name}
                    </IconButton>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className={clsx(styles.contentEditor, contentEditorOptions.fullscreen && styles.contentFullScreen)}>
        <div className={styles.contentHeader}>
          <label htmlFor="content" className={styles.previewLabel}>
            Content
          </label>
          <div className={styles.contentEditorOptions}>
            <Toggle
              id="toggle-fullscreen"
              label="フルスクリーンで編集"
              checked={contentEditorOptions.fullscreen}
              onChange={() =>
                setContentEditorOptions({ ...contentEditorOptions, fullscreen: !contentEditorOptions.fullscreen })
              }
            />
            <Toggle
              id="toggle-show-preview"
              label="プレビューを表示"
              checked={contentEditorOptions.preview}
              onChange={() =>
                setContentEditorOptions({ ...contentEditorOptions, preview: !contentEditorOptions.preview })
              }
            />
          </div>
        </div>
        <div className={styles.contentEditorBody}>
          <Textarea
            id="content"
            placeholder="ブログの本文"
            height={styles.contentEditorVars.bodyHeight}
            {...register('content')}
            error={errors.content?.message}
          />
          <div className={styles.preview[contentEditorOptions.preview ? 'show' : 'hide']}>
            <Article content={parseMarkdownToHTML(getValues('content') || '').content} />
          </div>
        </div>
      </section>
    </form>
  );
};
