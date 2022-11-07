import { BlogTag } from './tag';

interface Props {
  tags: string[];
}

export const BlogTagList = ({ tags }: Props) => {
  return (
    <div className="space-x-2">
      {tags.map((tag) => (
        <BlogTag tag={tag} key={tag} />
      ))}
    </div>
  );
};
