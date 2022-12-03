import { BlogTag } from './tag';

interface Props {
  tags: string[];
}

export const BlogTagList = ({ tags }: Props) => {
  return (
    <div className="gap-2 flex mt-1">
      {(tags || []).map((tag) => (
        <BlogTag key={tag} tag={tag} />
      ))}
    </div>
  );
};
