import { styles } from './BlogWrapper.css';

export const BlogWrapper = ({
  children,
  date,
  title,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  date: string;
}) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p>{date}</p>
      {children}
    </div>
  );
};
