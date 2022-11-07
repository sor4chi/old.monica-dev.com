interface Props {
  tag: string;
}

export const BlogTag = ({ tag }: Props) => {
  return (
    <div className="text-sm text-neutral-500 bg-neutral-100 rounded-md px-2 py-0.5">
      #{tag}
    </div>
  );
};
