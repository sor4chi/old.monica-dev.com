import { Blog } from '#/types/blog';
import { BlogCard } from '#/ui/blog/card';

interface Props {
  blogs: Blog[];
}

export const BlogCardList = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.url} />
      ))}
    </div>
  );
};
