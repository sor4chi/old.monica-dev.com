/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NextImage from 'next/image';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';

import * as styles from './image.css';

import { useClickOutside } from '@/hooks';
import { Button } from '@/ui/foundation/button';
import { XMark } from '@/ui/icons';

type Props = ComponentProps<'img'>;

const TWEMOJI_SRC = 'https://twemoji.maxcdn.com';

export const Image = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ref = useClickOutside(() => {
    setIsExpanded(false);
  });

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isExpanded]);

  if (props.src?.startsWith(TWEMOJI_SRC)) {
    return <img {...props} />;
  }

  // remark-image-sizeでwidthとheightが設定される
  const { alt, height, src, width } = props;

  const img = (
    <NextImage
      alt={alt || ''}
      src={src || ''}
      className={styles.image}
      onClick={() => setIsExpanded(true)}
      width={Number(width) || 0}
      height={Number(height) || 0}
    />
  );

  if (!isExpanded) {
    return img;
  }

  return (
    <>
      {img}
      <span className={styles.expanded}>
        <span ref={ref}>
          {/* eslint-disable @next/next/no-img-element */}
          <img src={src} alt={alt} className={styles.expandedImage} />
        </span>
        <span className={styles.close}>
          <Button
            variant="secondary"
            size="sm"
            icon={<XMark className={styles.closeIcon} />}
            onClick={() => setIsExpanded(false)}
          >
            Close
          </Button>
        </span>
      </span>
    </>
  );
};
