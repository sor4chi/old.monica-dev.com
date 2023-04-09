import { lazy, useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { useBlogEditor } from '../../use-blog-editor';

const EditorFormTagCreate = lazy(() => import('./create'));
import * as styles from './tag.css';

import { gql } from '@/lib/graphql';
import { Button } from '@/ui/foundation/button';
import { Checkbox } from '@/ui/foundation/checkbox/checkbox';

export const BlogEditorFormTagFragment = gql`
  fragment BlogEditorFormTagFragment on Tag {
    id
    name
    slug
  }
`;

export type BlogEditorFormTagFragmentResponse = {
  id: number;
  name: string;
  slug: string;
};

interface Props {
  tagsOptions: BlogEditorFormTagFragmentResponse[];
}

export const BlogEditorFormTag = ({ tagsOptions }: Props) => {
  const { form } = useBlogEditor();
  const { register } = form;
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [tagsOptionsState, setTagsOptionsState] = useState(tagsOptions);

  useEffect(() => {
    setTagsOptionsState(tagsOptions);
  }, [tagsOptions]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const parent = e.target.parentElement;
    if (parent) {
      parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Tags</label>
      <div className={styles.tags}>
        {isCreateNew && (
          <EditorFormTagCreate
            setTagsOptionsState={setTagsOptionsState}
            isCreateNew={isCreateNew}
            setIsCreateNew={setIsCreateNew}
          />
        )}
        {tagsOptionsState.map((tag) => (
          <Checkbox
            key={tag.slug}
            label={tag.name}
            value={tag.id}
            id={`tags-${tag.slug}`}
            {...register(`tagIds`)}
            onFocus={handleFocus}
          />
        ))}
      </div>
      <Button
        // not to submit the form
        type="button"
        icon={<IoIosAdd size={24} />}
        onClick={() => setIsCreateNew(true)}
        variant="secondary"
        size="sm"
      >
        New Tag
      </Button>
    </div>
  );
};
