import type { ComponentPropsWithoutRef } from 'react';
import { File } from 'react-feather';

export const Icon = (props: ComponentPropsWithoutRef<'i'>) => {
  const icon = (props as any)['data-icon'];
  if (icon === 'file') return <File strokeWidth={1.5} size="1em" />;
  return null;
};
