import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { z } from 'zod';

import { TagList } from '../tagList';

import * as styles from './form.css';

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
  tags: z.array(
    z.object({
      name: z.string().min(1, { message: 'タグを入力してください' }),
      slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'タグは半角英数字とハイフンのみで入力してください' }),
    }),
  ),
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
});

type Scheme = z.infer<typeof scheme>;

const postBlog = async (params: Scheme) => {
  console.log(params);
};

interface Props {
  blog: {
    id: number;
    title: string;
    description: string;
    content: string;
    tags: {
      slug: string;
      name: string;
    }[];
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
  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });
  const formData = watch();
  const [showPreview, setShowPreview] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [searchTagInput, setSearchTagInput] = useState({
    name: '',
    slug: '',
  });

  const onSubmit = (d: Scheme) => {
    postBlog(d);
    setPhase('success');
    setValue('description', '');
    setValue('title', '');
    setValue('content', '');
    setValue('tags', []);
    removeBlogFromLocalStorageById(blog.id);
  };

  const handleChange = () => {
    updateBlogFromLocalStorageById(blog.id, formData);
  };

  const handleSubmitTag = () => {
    const tags = getValues('tags');
    const newTag = {
      name: searchTagInput.name,
      slug: searchTagInput.slug,
    };
    setValue('tags', [...tags, newTag]);
    setSearchTagInput({
      name: '',
      slug: '',
    });
    setShowTagInput(false);
  };

  useEffect(() => {
    const data = getBlogFromLocalStorageById(blog.id);
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('content', data.content);
      setValue('tags', data.tags);
    } else {
      setValue('title', blog.title);
      setValue('description', blog.description);
      setValue('content', blog.content);
      setValue('tags', blog.tags);
    }
  }, []);

  const filteredTags = useMemo(() => {
    if (Object.values(searchTagInput).some((v) => v === '')) {
      return [];
    }
    return tagOptions
      .filter((tag) => tag.name.toLowerCase().includes(searchTagInput.name.toLowerCase()))
      .filter((tag) => {
        const tags = formData.tags || [];
        return !tags.some((t) => t.slug === tag.slug);
      });
  }, [searchTagInput, tagOptions, formData.tags]);

  if (phase === 'success') {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
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
        <div>
          <label className={styles.tagEditorLabel}>Tags</label>
          <TagList tags={getValues('tags') || []} hrefGenerator={(slug) => `/tags/${slug}`} />
        </div>
        <div className={styles.tagEditor}>
          <div className={styles.contentHeader}>
            <label htmlFor="content" className={styles.previewLabel}>
              Content
            </label>
            <div className={styles.tagSettingHeader}>
              <label htmlFor="toggle-show-tag-input">タグを追加</label>
              <Toggle
                id="toggle-show-tag-input"
                label="タグを追加"
                checked={showTagInput}
                onChange={() => setShowTagInput(!showTagInput)}
              />
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
                    value={searchTagInput.slug}
                    onChange={(e) => setSearchTagInput({ ...searchTagInput, slug: e.target.value })}
                  />
                  <TextInput
                    label="Name"
                    id="name"
                    placeholder="名前"
                    value={searchTagInput.name}
                    onChange={(e) => setSearchTagInput({ ...searchTagInput, name: e.target.value })}
                  />
                  <Button type="button" onClick={handleSubmitTag}>
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
                  value={searchTagInput.name}
                  onChange={(e) => setSearchTagInput({ ...searchTagInput, name: e.target.value })}
                />
                <div className={styles.tagList}>
                  {filteredTags.map((tag) => (
                    <IconButton
                      key={tag.slug}
                      icon={<MdAdd />}
                      onClick={() => setValue('tags', [...getValues('tags'), tag])}
                    >
                      {tag.name}
                    </IconButton>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className={styles.contentHeader}>
          <label htmlFor="content" className={styles.previewLabel}>
            Content
          </label>
          <div className={styles.previewSetting}>
            <label htmlFor="toggle-show-preview">プレビューを表示</label>
            <Toggle
              id="toggle-show-preview"
              label="プレビュー"
              checked={showPreview}
              onChange={() => setShowPreview(!showPreview)}
            />
          </div>
        </div>
        <div className={styles.contentEditor}>
          <Textarea
            id="content"
            placeholder="ブログの本文"
            height={styles.PREVIEW_EDITOR_HEIGHT}
            {...register('content')}
            error={errors.content?.message}
          />
          <div className={styles.preview[showPreview ? 'show' : 'hide']}>
            <Article content={parseMarkdownToHTML(getValues('content') || '').content} />
          </div>
        </div>
      </section>
      <Button type="submit">Submit</Button>
    </form>
  );
};
