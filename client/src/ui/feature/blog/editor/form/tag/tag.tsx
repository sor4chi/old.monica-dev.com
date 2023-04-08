import { useBlogEditor } from '../../use-blog-editor';

import * as styles from './tag.css';

import { gql } from '@/lib/graphql';
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
        {tagsOptions.map((tag) => (
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
    </div>
  );
};
