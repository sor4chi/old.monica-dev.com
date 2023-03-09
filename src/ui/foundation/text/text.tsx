import mikan from 'mikanjs';

import * as styles from './text.css';

interface Props {
  value: string;
}

export const Text = ({ value }: Props) => {
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
