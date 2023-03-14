import { BlogTag as TBlogTag } from '@prisma/client';

import { BlogTag } from './tag';

interface Props {
  tags: TBlogTag[];
}

export const BlogTagList = ({ tags }: Props) => {
  return (
    <div className="mt-1 flex gap-2">
      {(tags || []).map((tag) => (
        <BlogTag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
