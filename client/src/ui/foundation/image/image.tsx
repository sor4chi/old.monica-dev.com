import clsx from 'clsx';
import NextImage from 'next/image';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import * as styles from './image.css';

import { useClickOutside } from '@/hooks';
import { Button } from '@/ui/foundation/button';

type Props = ComponentProps<'img'> & {
  nextImage?: boolean;
};

const _Image = (props: Props) => {
  const { alt, nextImage = false, src } = props;
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

  const img = (
    <span className={styles.imageContainer}>
      {nextImage ? (
        <NextImage alt={alt || ''} src={src || ''} fill className={styles.image} onClick={() => setIsExpanded(true)} />
      ) : (
        <>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            alt={alt || ''}
            src={src || ''}
            className={clsx(styles.image, styles.imageFill)}
            onClick={() => setIsExpanded(true)}
          />
        </>
      )}
    </span>
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
          <Button variant="secondary" size="sm" icon={<IoIosClose size={24} />} onClick={() => setIsExpanded(false)}>
            Close
          </Button>
        </span>
      </span>
    </>
  );
};

export const UnOptimizedImage = (props: Props) => <_Image {...props} />;
export const OptimizedImage = (props: Props) => <_Image {...props} nextImage />;
