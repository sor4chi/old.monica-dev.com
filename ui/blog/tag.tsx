interface Props {
  tag: string;
}

export const BlogTag = ({ tag }: Props) => {
  return (
    <div className="text-sm text-neutral-500 bg-neutral-100 rounded-full px-2 py-1">
      {tag}
    </div>
  );
};
