import mikan from 'mikanjs';

import * as styles from './text.css';

interface Props {
  value: string;
  normal?: boolean;
}

export const Text = ({ normal, value }: Props) => {
  if (normal) {
    return <span className={styles.word}>{value}</span>;
  }

  return (
    <>
      {mikan.split(value).map((item, i) => (
        <span key={i} className={styles.word}>
          {item}
        </span>
      ))}
    </>
  );
};
