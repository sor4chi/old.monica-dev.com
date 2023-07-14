import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import { styles } from './Image.css';

export const MDXImage = ({ alt, src }: ComponentPropsWithoutRef<'img'>) => (
  <Image className={styles.image} src={src as string} alt={alt as string} width={640} height={360} />
);
